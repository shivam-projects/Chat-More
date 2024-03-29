const socket = io('http://localhost:8000');

// Get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinput')
const messageContainer = document.querySelector(".container")
var audio = new Audio('ring.mp3')

const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){ 
        audio.play();
    }
}

const name = prompt("Enter your name to join");
    socket.emit('new-user-joined', name);
 
// Send the user's name to the server



socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right')
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name =>{
    append(`${name} left the chat`, 'right')
})

form.addEventListener('submit', (done) => {
    done.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})







