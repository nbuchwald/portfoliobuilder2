//localStorage.js
//Modeled after count LocalStorage example from Prof. Mertz
$(document).ready(function(){
	var projectData;
	//Testing to see if this works...
	var countData = {count:0};
	loadDataFromLocalStorage();


  	$('#count').text(countData.count);


  // On tap of increment button
  $('#add').click(function() {
    console.log("added!");
    // Increment the count
    countData.count++;
    // Update the display
    $('#count').text(countData.count);
    // Save data to local storage
    saveDataToLocalStorage();
    // Clear the status line in case it has an old message
    $('#status').text("");
  });
  
  // On tap of the refresh button
  $('#refresh').click(function() {
    // Try to refresh data from the server
    $.getJSON('projects.json')
      .done(function(data) {
        // Upon success, update status line
        $('#status').text("Successful refresh");
        // Replace countData with data returned from server
        countData = data;
        // Update the displayed count
        $('#count').text(countData.count);
        //Save the updated count
        saveDataToLocalStorage();
      }) // notice no semicolon for these methods are chained together
      .fail(function() {
        // Update status if Ajax failed (e.g. network down, server down)
        $('#status').text("Refresh failed");
      });
  });
  
  function saveDataToLocalStorage() {
    // Turn countData into a JSON string, and store it to localStorage
    localStorage.countData = JSON.stringify(countData);
  }

  function loadDataFromLocalStorage() {
    // If countData has been stored to localStorage
    if (localStorage.countData
        && JSON.parse(localStorage.countData)) {
          // retrieve and parse the JSON
          countData = JSON.parse(localStorage.countData);
    }
  }

  // If a new version of the app is available, then update the cached version
  window.applicationCache.addEventListener('updateready',function(){
    window.applicationCache.swapCache();
    location.reload();
  });

$('#GoogleSignIn').show( function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
      });

});
