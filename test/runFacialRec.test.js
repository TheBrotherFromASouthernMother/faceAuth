const { facial_DectClose, handlePythonResponse, faceFoundEvent } = require("../child.js")

test("facialDectResult is equal to true, false, or an error string", () => {
  expect(facial_DectClose(1, "True ")).toBe(true);
  expect(facial_DectClose(1, "False")).toBe(false);
  expect(facial_DectClose(2, "False     ")).toBe(false);
});
