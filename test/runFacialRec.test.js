const { facial_DectClose, handlePythonResponse, faceFoundEvent } = require("../child.js")



test("facialDectResult is equal to true, false, or an error string", () => {
  expect(facial_DectClose(1, "True ")).toBe(true);
});
