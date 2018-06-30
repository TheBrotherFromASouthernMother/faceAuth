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
  let body = "";

  req.on('data', data => {
    body += data;
  })

  req.on("end", () => {
    let data = body;
    data = new Buffer(data, 'base64');
    fs.writeFile('./uploads/face70.jpg', data, (err) => {
      if (err) throw err;
      PythonProcess.isSingleFaceDeteched("./uploads/face70.jpg")
      PythonProcess.faceFoundEvent.on('end', ()=> {

      })
      console.log('The file has been saved!');
      //TODO: connect child.js to check that their is a single the face within picture
      //TODO: Create script to run the new face against the database of faces in the banned_user section
      //TODO: If user does not appear in the banned users folder grant permissions and write file to confirmed users folder
    });
  })




});
app.listen(port, ()=> {
  console.log(`Server listening on port ${port}`)
} )
