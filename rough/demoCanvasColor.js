var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var putColor = document.getElementById('choice').value;
var choice= document.getElementById('choice');

choice.addEventListener('change', ()=>{
    //c.style.background = putColor;
ctx.fillStyle = putColor ;
ctx.fillRect(20, 20, 150, 100);
})

