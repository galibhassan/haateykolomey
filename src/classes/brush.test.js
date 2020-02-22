// UNIT TESTING
// This file ensures whether the Brush class works
const assert = require('assert').strict

// Calling the brush class and creating an instance
const Brush = require('./brush').Brush
const kashemBrush = new Brush( 10, "blue", "pencil");

// checking getters and setters
// test 1
console.log("getBrushSize should work")
assert.equal(kashemBrush.getBrushSize(), 10)

// test
console.log("setBrushSize should work")
kashemBrush.setBrushSize(20)
assert.equal(kashemBrush.getBrushSize(), 20)
