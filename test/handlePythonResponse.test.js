const { handlePythonResponse } = require("../child.js");

test("Given a string it should return booleans of the strings \'true\' and \'false\' or the string itself", () => {
  expect(handlePythonResponse("true")).toBe(true);
  expect(handlePythonResponse("false")).toBe(false);
  expect(handlePythonResponse("too many faces")).toBe("too many faces");
});
