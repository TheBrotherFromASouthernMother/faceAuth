const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;
const PythonProcess = require('./child.js')


app.set("view engine", "ejs");
app.set("views", "./views");


app.get("/", (req, res) => {
  res.render("login");
})


app.post('/',function(req,res){

  // Had to use old school piping as the Express body-parser package only accepts JSON and XML data
  let body = "";
  req.on('data', data => {
    body += data;
  })

  req.on("end", () => {
    let data = body;
    data = new Buffer(data, 'base64');
    //TODO: image file name should be a unique, most likely based off the name of the user,
    //TODO: This means additional functionality will have to be built out that checks the username against a SQL db to ensure uniqueness
    //TODO: Will also need to update the client side to the username via AJAX
    fs.writeFile('./uploads/face70.jpg', data, (err) => {
      if (err) throw err;
      PythonProcess.runFacialRec("./uploads/face70.jpg")
      PythonProcess.faceFoundEvent.on('end', ()=> {
        let { facialDectResult } = require("./child.js");
        console.log(facialDectResult, "in app.js")
      })
      console.log('The file has been saved!');

      //TODO: If user does not appear in the banned users folder grant permissions and write file to confirmed users folder
    });
  })


});
app.listen(port, ()=> {
  console.log(`Server listening on port ${port}`)
} )
