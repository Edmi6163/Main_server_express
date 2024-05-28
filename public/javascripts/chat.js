const socket = io();
let myName = "";
let mySurname ="";
let currentRoom ="";

function init_chat() {
    const messages = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const messageButton = document.getElementById('messageButton');
    const formButton = document.getElementById("form-btn");

    messageButton.addEventListener('click', () => {
        socket.emit('chat message', currentRoom, messageInput.value, getMyFullName());
        messageInput.value = '';
    });

    let logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', (event) => {
        localStorage.clear();
        // or localstorage.removeItem('my_name');
        document.getElementById("form_container").style.display = 'block';
        document.getElementById("message_container").style.display = 'none';
        socket.emit('leave room', currentRoom, getMyFullName()); // Send a leave room event
        currentRoom = null;
    })
    let field = document.getElementById('messageInput');
    field.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            socket.emit('chat message', currentRoom, messageInput.value, getMyFullName());
            messageInput.value = '';
            return false;
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


    myName = localStorage.getItem('my_name');
    mySurname = localStorage.getItem('my_surname');
    currentRoom= localStorage.getItem('room');
    if (myName) {
        document.getElementById('name').value= myName;
        document.getElementById('surname').value= mySurname;
    }
    document.getElementById("form_container").style.display = 'block';
    document.getElementById("message_container").style.display = 'none';
    document.getElementById('logout').style.display='none';
}
function room_generate() {
    const currentRoom = document.getElementById('room');
    console.log("room_generate() è stata chiamata con currentRoom:", currentRoom);
    myName = document.getElementById("name").value;
    mySurname = document.getElementById("surname").value;
    document.getElementById("form_container").style.display = 'none';
    document.getElementById("message_container").style.display = 'block';
    socket.emit('create or join conversation', currentRoom, myName);
    localStorage.setItem('my_name', myName);
    localStorage.setItem('my_surname', mySurname);
    localStorage.setItem('room', currentRoom);
    document.getElementById('welcome').innerHTML= currentRoom.value;
    document.getElementById('logout').style.display='block';
    event.preventDefault();
}
function getMyFullName(){
    return myName+" "+mySurname
}


function search() {
    let elems = document.querySelectorAll(".Cname");
    let searchValue = document.getElementById("search").value;
    let anyMatch = false; // Verifica se c'è almeno un match

    for (let i = 0; i < elems.length; i++) {
      if (searchValue && elems[i].innerText.toLowerCase().includes(searchValue)) {
        elems[i].style.display = 'block';
        anyMatch = true;

      } else{
        elems[i].style.display = 'none';
      }
    }
    if (!searchValue) {
        // Se non c'è nessun testo nella barra di ricerca, mostra tutti gli elementi
        for (let i = 0; i < elems.length; i++) {
            elems[i].style.display = 'block';
        }
    }
  }