

const socket = io();
let myName = "";
let mySurname = "";
let currentRoom = "";

function init_chat() {
    const messages = document.getElementById('messages');
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        toggleDarkMode();
    } else {
        toggleLightMode();
    }

    const messageButton = document.getElementById('messageButton');
    messageButton.addEventListener('click', () => {
        sendMessage();
    });

    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', (event) => {
        localStorage.clear();
        document.getElementById('form_container').style.display = 'block';
        document.getElementById('message_container').style.display = 'none';
        document.getElementById('welcome').textContent = "";
        socket.emit('leave room', currentRoom, getMyFullName());
        currentRoom = null;
    });

    const messageInput = document.getElementById('messageInput');
    messageInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
            event.preventDefault();
        }
    });

    socket.on('chat message', (msg, senderName) => {
        appendMessage(senderName, msg);
    });

    socket.on('create or join conversation', (name) => {
        if (name !== getMyFullName()) {
            appendSystemMessage(name + " has joined the conversation");
        }
    });

    socket.on('disconnect', (name) => {
        if (name !== getMyFullName()) {
            appendSystemMessage(name + " has left the conversation");
        }
    });

    myName = localStorage.getItem('my_name');
    mySurname = localStorage.getItem('my_surname');
    currentRoom = localStorage.getItem('room');
    if (myName) {
        document.getElementById('name').value = myName;
        document.getElementById('surname').value = mySurname;
        document.getElementById('room').value = currentRoom;
    }
    document.getElementById('form_container').style.display = 'block';
    document.getElementById('message_container').style.display = 'none';
    document.getElementById('logout').style.display = 'none';
}

function appendMessage(senderName, message) {
    const li = document.createElement('li');
    li.textContent = senderName + ": " + message;
    if (senderName === getMyFullName()) {
        li.classList.add('sent');
    } else {
        li.classList.add('received');
    }
    messages.appendChild(li);
}

function setChannel(text){
    const box = document.getElementById('room');
    box.value = text;
}

function appendSystemMessage(message) {
    const li = document.createElement('li');
    li.textContent = message;
    li.classList.add('system-message');
    messages.appendChild(li);
}

function room_generate() {
    event.preventDefault();
    myName = document.getElementById('name').value;
    mySurname = document.getElementById('surname').value;
    document.getElementById('form_container').style.display = 'none';
    document.getElementById('message_container').style.display = 'block';
    currentRoom = document.getElementById('room').value;
    socket.emit('create or join conversation', currentRoom, getMyFullName());
    localStorage.setItem('my_name', myName);
    localStorage.setItem('my_surname', mySurname);
    localStorage.setItem('room', currentRoom);
    document.getElementById('welcome').textContent = currentRoom;
    document.getElementById('welcome').style.display = 'block';
    document.getElementById('logout').style.display = 'block';
}

function getMyFullName() {
    return myName + " " + mySurname;
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (message === '') return;
    socket.emit('chat message', currentRoom, message, getMyFullName());
    messageInput.value = '';
}

function toggleLightMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
}

function toggleDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
}
