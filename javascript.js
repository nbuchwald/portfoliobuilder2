//javascript.js

$(document).ready(function(){
	$('form').submit(function (event) {
	  // event.preventDefault();
	  var newProjectAdded = $('<div class="alert alert-success" role="alert">' +
   'You successfully added a new project!' +'</div>');
	  $('.rowOfProjects').beofre(newProjectAdded);
	  
	});
})

