//Initialize Express
const express = require('express');
const bodyParser= require('body-parser'); //needed to parse post requests
const app = express();

app.use(bodyParser.urlencoded({extended: true})); //use bodyparser for forms

//set ejs as view engine
app.set('view engine', 'ejs')


//mongoDB connection
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://nbuchwald:bubbi727@ds159517.mlab.com:59517/porfoliobuilder'
	, function (err, database) {
		if (err) return console.log(err)
  		db = database
  	//localhost server
  		app.listen(3000, () => {
    		console.log('Listening on 3000...with db connection')
  		})
  
});

//GET Request
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
  //__dirname = /Users/natalyabuchwald/Desktop/portfoliobuilder2
  var cursor = db.collection('projects').find()
  //projects: db collection retrieval
  db.collection('projects').find().toArray(function(err, results) {
  console.log(results)
  // send HTML file populated with quotes here
})
});




//POST Request
app.post('/projects', function (req, res) {
	db.collection('projects').save(req.body, function (err, result) {
    if (err) return console.log(err)

    console.log('Saved to Database')
    res.redirect('/')
  })
})

