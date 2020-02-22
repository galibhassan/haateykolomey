const Brush = require('./classes/brush').Brush

const canvas = document.getElementById("canvas");
const myBrush = new Brush( 20, "red", "kolom")

// event handlers
canvas.addEventListener("click", myBrush.drawCircle)