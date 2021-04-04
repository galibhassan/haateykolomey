var clientChatInput = document.getElementById("clientChatInput");
var sendButton = document.getElementById("sendButton");
var chatOutput = document.getElementById("chatOutput");
var clientName = document.getElementById("clientName");
var userName = clientName.innerHTML;
var roomName = document.getElementById("roomName");
var roomPassword = document.getElementById("roomPassword");

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  const UPPER_LIMIT = 230;
  let outputColor = null;

  if (r > UPPER_LIMIT && g > UPPER_LIMIT && b > UPPER_LIMIT) {
    outputColor = getRandomColor();
  } else {
    outputColor = `rgb(${r},${g},${b})`;
  }
  return outputColor;
};
const userColor = getRandomColor();

function handleChatInput(){
  clientSocket.emit("somoneSaidSomething", {
    clientName: clientName.innerText,
    chatboxMessage: clientChatInput.innerHTML,
    roomName: roomName.innerText,
    clientColor: userColor,
  });
  clientChatInput.innerHTML = "";
}

sendButton.addEventListener("click", handleChatInput);
clientChatInput.addEventListener("keypress", (e)=>{
  if(e.key === "Enter") {
    handleChatInput()
  }
})

clientSocket.on("serverEmittingSomeonesWords", (roFromServer) => {
  pushChatPortionToChatOutput(roFromServer);
});

clientSocket.on("message", (message) => {
  console.log(message);
  userConnectionInfo(message);
  chatOutput.scrollTop = chatOutput.scrollHeight;
});

function userConnectionInfo(message) {
  const div = document.createElement("div");
  div.innerHTML = `<p> ${message.time}</p>
    <p>${message.username} ${message.text}</p>`;
  document.getElementById("chatOutput").appendChild(div);
  div.setAttribute("class", "userJoinedTime");
}

function pushChatPortionToChatOutput(ro) {
  var firstLastCharecterDiv = document.createElement("div");
  var usernameDiv = document.createElement("div");
  var messageDiv = document.createElement("div");
  var chatPortionContainer = document.createElement("div");

  firstLastCharecterDiv.innerHTML = getInitials(ro.clientName);

  usernameDiv.innerHTML = ro.clientName;
  messageDiv.innerHTML = ro.chatboxMessage;

  // removing copy-pasted style
  Array.from(messageDiv.children).forEach((child) => {
    child.style.all = "unset";
  });

  firstLastCharecterDiv.setAttribute("class", "userIntial");
  firstLastCharecterDiv.style.background = ro.clientColor;
  usernameDiv.setAttribute("class", "usernameDiv");
  messageDiv.setAttribute("class", "chatChunk");
  chatPortionContainer.setAttribute("class", "chatContainer");

  chatPortionContainer.appendChild(firstLastCharecterDiv);
  chatPortionContainer.appendChild(usernameDiv);
  chatPortionContainer.appendChild(messageDiv);

  chatOutput.appendChild(chatPortionContainer);
}

function getInitials(username) {
  var firstName = username.split(" ")[0];
  var lastName = username.split(" ")[1];
  var intials =
    firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  return intials;
}
