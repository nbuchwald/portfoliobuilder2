var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

//Code modified thanks to tutorial by https://www.airpair.com/javascript/complete-expressjs-nodejs-mongodb-crud-skeleton
router.route('/')
    //GET all projects
    .get(function(req, res, next) {
     
        mongoose.model('Project').find({}, function (err, projects) {
              if (err) {
                  return console.error(err);
              } else {
                 
                  res.format({
                     html: function(){
                        res.render('index', {
                              title: 'All my Projects',
                              "projects" : projects
                          });
                    },
                    //JSON response will show all projects in JSON
                    json: function(){
                        res.json(projects);
                    }
                });
              }     
        });
    })
    //POST a new project
    .post(function(req, res) {
        
        var name = req.body.name;
        var description = req.body.description;
        var course = req.body.course;
        var startDate = req.body.startDate;
        var dueDate = req.body.dueDate;
        var goals = req.body.goals;
        //call the create function for our database
        mongoose.model('Project').create({
            name : name,
            description : description,
            course : course,
            startDate : startDate,
            dueDate : dueDate,
            goals : goals
        }, function (err, project) {
              if (err) {
                  res.send(err + "There was a problem adding the project to the database.");
              } else {
                  //project has been created
                  console.log('POST creating new project: ' + project);
                  res.format({
                    
                    html: function(){
                        
                        res.location("projects");
                      
                        res.redirect("/projects");
                    },
                    //JSON response will show the newly created project
                    json: function(){
                        res.json(projects);
                    }
                });
              }
        })
    });

/* GET New project page. */
router.get('/new', function(req, res) {
    res.render('new', { title: 'Add New Project' });
});


router.param('id', function(req, res, next, id) {
  
    //find the ID in the Database
    mongoose.model('Project').findById(id, function (err, project) {
    
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        
        } else {
      
            req.id = id;
    
            next(); 
        } 
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Project').findById(req.id, function (err, project) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {

        console.log('GET Retrieving ID: ' + project._id);
        var name = project.name.toString();
        name = name.substring(0, name.indexOf('T'))
        res.format({
          html: function(){
              res.render('show', {
                "Name" : name,
                "Project" : project
              });
          },
          json: function(){
              res.json(project);
          }
        });
      }
    });
  });

  //GET the individual project by Mongo ID
router.get('/:id/edit', function(req, res) {
    //search for the project within Mongo
    mongoose.model('Project').findById(req.id, function (err, project) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            //Return the project
            console.log('GET Retrieving ID: ' + project._id);
            
          var name = project.name.toISOString();
          name = name.substring(0, name.indexOf('T'))
            res.format({
               
                html: function(){
                       res.render('edit', {
                          title: 'Project' + project._id,
                        "name" : name,
                          "project" : project
                      });
                 },
                 
                json: function(){
                       res.json(project);
                 }
            });
        }
    });
});

//PUT to update a project by ID
router.put('/:id/edit', function(req, res) {

        var name = req.body.name;
        var description = req.body.description;
        var course = req.body.course;
        var startDate = req.body.startDate;
        var dueDate = req.body.dueDate;
        var goals = req.body.goals;

   //find the document by ID
        mongoose.model('Project').findById(req.id, function (err, project) {
            //update it
            project.update({
              name : name,
              description : description,
              course : course,
              startDate : startDate,
              dueDate : dueDate,
              goals : goals
            }, function (err, projectID) {
              if (err) {
                  res.send("There was a problem updating the information to the database: " + err);
              } 
              else {
                      //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                      res.format({
                          html: function(){
                               res.redirect("/projects/" + project._id);
                         },
                         //JSON responds showing the updated values
                        json: function(){
                               res.json(project);
                         }
                      });
               }
            })
        });
});

//DELETE a Project by ID
router.delete('/:id/edit', function (req, res){
    //find project by ID
    mongoose.model('project').findById(req.id, function (err, project) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            project.remove(function (err, project) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    console.log('DELETE removing ID: ' + project._id);
                    res.format({
                        //HTML returns us back to the main page, or you can create a success page
                          html: function(){
                               res.redirect("/projects");
                         },
                         //JSON returns the item with the message that is has been deleted
                        json: function(){
                               res.json({message : 'deleted',
                                   item : project
                               });
                         }
                      });
                }
            });
        }
    });
});


module.exports = router;

