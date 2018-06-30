const { spawn } = require('child_process');
const EventEmitter = require("events").EventEmitter;

let faceFoundEvent = new EventEmitter;
module.exports.faceFoundEvent = faceFoundEvent;

function runFacialRec(img) {

  const facial_dect = spawn('python3', ['app.py', img], {'detached': true});

  let facialDectResult = "";

  facial_dect.stdout.on('data', function (data){
    facialDectResult += data;
    faceFoundEvent.emit('data', data)
  });

  //Because return a value from an async callback is impossible
  facial_dect.on('close', (code) => {
    facialDectResult = facialDectResult.toString().toLowerCase().slice(0, facialDectResult.indexOf(" "));
    facialDectResult = handlePythonResponse(facialDectResult)
    console.log(`child process exited with code ${code}`);
    faceFoundEvent.emit('end');
    module.exports.facialDectResult = facialDectResult;
  });


}

module.exports.runFacialRec = runFacialRec;

//Determines on the JavaScript side whether the user is banned or even if there was a face dection
function handlePythonResponse(result) {
  if (result === "true" || result === "false") {
    return Boolean(result);
  } else {
    return result
  }
}
