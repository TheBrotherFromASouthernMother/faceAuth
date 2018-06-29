const express = require('express');
const multer  =   require('multer');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("login")

  let txt = fs.readFile('Biddr.png', (err, data) => {
    if (err) {
       throw err;
     }
     const { StringDecoder } = require('string_decoder');
     const decoder = new StringDecoder('base64');

     const cent = Buffer.from(data);
     console.log(decoder.write(cent));

     fs.writeFile('Biddr.txt', data, 'base64', (err) => {if (err) throw err})
     console.log(data);
  })

})

app.post('/',function(req,res){
  let body = "";
  req.on('data', data => {
    body += data;
  })
  req.on("end", () => {
    let data = body;
    data = new Buffer(data, 'base64');
    console.log(data)
    fs.writeFile('./uploads/face69.png', data, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })




});
app.listen(port, ()=> {
  console.log(`Server listening on port ${port}`)
} )
