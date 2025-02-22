//Instance of socket
const socket = io();

//Element
const sendButton = document.querySelector(".send-button");
const messageArea = document.querySelector("#messageArea");
const messageInput = document.querySelector("#messageInput");

//Add message
function addMessage(message, sender) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = message;
    messageArea.appendChild(messageDiv);
    messageArea.scrollTop = messageArea.scrollHeight;
}

//Display server message
socket.on("messageFromServer", (message) => {
    console.log(message);
    addMessage(message, 'server');
});

//Send message
function sendMessage() {
    const message = messageInput.value.trim();
    if(message){
        socket.emit("messageFromClient", message);
        addMessage(message, 'client');
        messageInput.value = "";
    }
}

sendButton.addEventListener('click', sendMessage);

//Hand server greeting with acknowledgement
socket.on('greeting', (message, callback) => {
    callback({
        status: 'received',
        message: 'Thanks for greeting',
        timestamp: new Date()
    })
});