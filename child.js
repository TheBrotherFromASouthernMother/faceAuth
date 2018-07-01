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


  facial_dect.on('close', facial_dectClose(code, facialDectResult));
} //end runFacialRec

module.exports.runFacialRec = runFacialRec;

//Because returning a value from a callback to a parent scope is impossible, results must be pickedup via module export/import
function facial_DectClose(process_code, facialDectResult) {
  facialDectResult = facialDectResult.toString().toLowerCase();
  facialDectResult = handlePythonResponse(facialDectResult)
  console.log(`child process exited with code ${process_code}`);
  faceFoundEvent.emit('end');
  module.exports.facialDectResult = facialDectResult;
  return facialDectResult;
}

module.exports.facial_DectClose = facial_DectClose;

//Determines on the JavaScript side whether the user is banned or even if there was a face dection
function handlePythonResponse(result) {
  if (result.includes("true")) {
    return true;
  } else if (result.includes("false")) {
    return false;
  } else {
    return result
  }
}

module.exports.handlePythonResponse = handlePythonResponse;
