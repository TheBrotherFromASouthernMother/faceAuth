const { spawn } = require('child_process');
const EventEmitter = require("events").EventEmitter;

let faceFoundEvent = new EventEmitter;
module.exports.faceFoundEvent = faceFoundEvent;

function isSingleFaceDeteched(img) {

  const facial_dect = spawn('python3', ['app.py', img], {'detached': true});

  let face_location = "";

  facial_dect.stdout.on('data', function (data){
    face_location += data;
    faceFoundEvent.emit('data', data)
  });


  facial_dect.on('close', (code) => {
    face_location = face_location.toString();
    console.log(face_location)
    console.log(`child process exited with code ${code}`);
    faceFoundEvent.emit('end');
    module.exports.face_location = face_location;
  });


}

module.exports.isSingleFaceDeteched = isSingleFaceDeteched;
