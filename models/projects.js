var mongoose = require('mongoose');
    

var Schema = mongoose.Schema;

// create project schema
var projectSchema = new Schema({
  name: String,
  description: String,
  course: String,
  startDate: String,
  dueDate: String,
  goals: String
});

// the schema is useless so far
// we need to create a model using it
var Project = mongoose.model('Project', projectSchema);

// make this available to our users in our Node applications
module.exports = Project;