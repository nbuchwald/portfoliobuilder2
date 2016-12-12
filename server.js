//Initialize Express
const express = require('express');
const bodyParser= require('body-parser'); //needed to parse post requests
var morgan = require('morgan');
const app = express();

//Intialize LocalStorage
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true})); //use bodyparser for forms

//set ejs as view engine
app.set('view engine', 'ejs')


//mongoDB connection
const MongoClient = require('mongodb').MongoClient
//var projects = [];
var db;
MongoClient.connect('mongodb://nbuchwald:bubbi727@ds159517.mlab.com:59517/porfoliobuilder'
	, function (err, database) {
		if (err) return console.log(err)
  		db = database
  	//localhost server
    var port = process.env.PORT || 3000;
    app.listen(port,function() {
        console.log('Listening on ' + port +'...with db connection')
      });
  		
  
});
//GET Request Ver 2
app.get('/', (req, res) => {
  db.collection('projects').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    
    res.render('index.ejs', {projects: result})
  })
})

//GET Request Ver 2
app.get('/specificProject', (req, res) => {
  db.collection('projects').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    
    res.render('specificProject.ejs', {projects: result})
  })
})

//Get static files
app.use(express.static(__dirname + '/'))


//POST Request
app.post('/projects', function (req, res) {
	db.collection('projects').save(req.body, function (err, results) {
    if (err) return console.log(err)

    console.log('Saved to Database');
    res.redirect('/');
  })
})

