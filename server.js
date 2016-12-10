//Initialize Express
const express = require('express');
const bodyParser= require('body-parser'); //needed to parse post requests
const app = express();

app.use(bodyParser.urlencoded({extended: true})); //use bodyparser for forms

//localhost server
app.listen(3000, function() {
  console.log('Listening on 3000...')
});

//GET Request
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
  //__dirname = /Users/natalyabuchwald/Desktop/portfoliobuilder2
});

//POST Request
app.post('/projects', (req, res) => {
  console.log(req.body)
})

