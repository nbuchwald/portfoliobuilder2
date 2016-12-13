//Initialize Express
const express = require('express');
const bodyParser= require('body-parser'); //needed to parse post requests
var morgan = require('morgan');
const app = express();
var methodOverride = require('method-override'); //used to manipulate POST

//Intialize Mongoose
var mongoose = require('mongoose');
// db = require('./models/db'),
projects = require('./models/projects'),

mongoose.connect('mongodb://nbuchwald:bubbi727@ds159517.mlab.com:59517/porfoliobuilder');

//Intialize LocalStorage
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true})); //use bodyparser for forms

//set ejs as view engine
app.set('view engine', 'ejs')

//Get static files
app.use(express.static(__dirname + '/'))

//mongoDB connection
const MongoClient = require('mongodb').MongoClient
//var projects = [];

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

//var routes = require('/routes');
var projects = require('./routes/projects');
//app.use('/', routes);
app.use('/projects', projects);


app.get('*',function (req, res) {
        res.redirect('/projects');
    });