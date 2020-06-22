var message = document.getElementById("message");
var textBox = document.getElementById("textBox");
var button = document.getElementById("button");
var fc = document.getElementById("flc")



button.addEventListener("click", ()=>{
    var newMessage = document.createElement("newMessage");
    newMessage.innerHTML = textBox.value;
    message.appendChild(newMessage)

    
   var name = newMessage.innerHTML.split(" ")
   var name1 = [name[0][0],name[1][0]]
    
   flc.innerHTML = name1;
   
   
})