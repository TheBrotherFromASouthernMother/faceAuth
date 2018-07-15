function authenticateFaceRegistration(dataURL, userName) {
  $.ajax({
    type: "POST",
    url: `/serialize/face:${userName}`,
    data: dataURL
  }).done(function(o) {
    console.log('saved');
    // If you want the file to be visible in the browser
    // - please modify the callback in javascript. All you
    // need is to return the url to the file, you just saved
    // and than put the image in your browser.
  });
}
