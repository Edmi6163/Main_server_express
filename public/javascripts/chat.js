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
        toggleLightMode(); // Default to light mode
    }
    const messageButton = document.getElementById('messageButton');
    messageButton.addEventListener('click', () => {
        document.getElementById('messageInput').value = "";
        sendMessage();
    });

    let logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', (event) => {
        localStorage.clear();
        document.getElementById('form_container').style.display = 'block';
        document.getElementById('message_container').style.display = 'none';
        document.getElementById('welcome').innerHTML = " ";
        socket.emit('leave room', currentRoom, getMyFullName()); // Send a leave room event
        currentRoom = null;
    });

    let field = document.getElementById('messageInput');
    field.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
            event.preventDefault();
        }
    });

    socket.on('chat message', (msg, name) => {
        let who = (name === getMyFullName()) ? "Me" : name;
        const li = document.createElement('li');
        li.textContent = who + ": " + msg;
        messages.appendChild(li);
    });

    socket.on('create or join conversation', (name) => {
        if (name === myName) return;
        const li = document.createElement('li');
        li.textContent = name + ": " + "has joined the conversation";
        messages.appendChild(li);
    });

    socket.on('disconnect', (name) => {
        if (name === myName) return;
        const li = document.createElement('li');
        li.textContent = name + ": " + "has left the conversation";
        console.log("name: ", name + " has left the conversation");
        messages.appendChild(li);
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

function room_generate() {
    event.preventDefault();
    myName = document.getElementById('name').value;
    mySurname = document.getElementById('surname').value;
    document.getElementById('form_container').style.display = 'none';
    document.getElementById('message_container').style.display = 'block';
    currentRoom = document.getElementById('room').value;
    socket.emit('create or join conversation', currentRoom, myName);
    localStorage.setItem('my_name', myName);
    localStorage.setItem('my_surname', mySurname);
    localStorage.setItem('room', currentRoom);
    document.getElementById('welcome').innerHTML = currentRoom;
    document.getElementById('welcome').style.display = 'block';
    document.getElementById('logout').style.display = 'block';
}

function getMyFullName() {
    return myName + " " + mySurname;
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    socket.emit('chat message', currentRoom, messageInput.value, getMyFullName());
    console.log("Message is :", messageInput.value, "from", getMyFullName());
    messageInput.value = '';
}

function search() {
    let elems = document.querySelectorAll(".Cname");
    let searchValue = document.getElementById('search').value.toLowerCase();
    let anyMatch = false;

    for (let i = 0; i < elems.length; i++) {
        if (searchValue && elems[i].innerText.toLowerCase().includes(searchValue)) {
            elems[i].style.display = 'block';
            anyMatch = true;
        } else {
            elems[i].style.display = 'none';
        }
    }

    if (!searchValue) {
        for (let i = 0; i < elems.length; i++) {
            elems[i].style.display = 'block';
        }
    }
}
function setChannel(text)
{
    const box = document.getElementById('room');
    box.value = text;
}



//////////

function toggleLightMode() {
    // Remove dark mode class from body
    document.body.classList.remove('dark-mode');
    // Update local storage or any other state management
    localStorage.setItem('theme', 'light');
}

function toggleDarkMode() {
    // Add dark mode class to body
    document.body.classList.add('dark-mode');
    // Update local storage or any other state management
    localStorage.setItem('theme', 'dark');
}

