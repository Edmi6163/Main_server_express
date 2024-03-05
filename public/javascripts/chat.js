const socket = io();
let Username="";
let date_snd="";
let currentroom="";
function init() {
    const messages = document.getElementById('messages');
    const message_input = document.getElementById('message_input');
    const send_message_btn = document.getElementById('send_btn');

    send_message_btn.addEventListener('click', function () {
        socket.emit('chat message', currentroom, message_input.value, Username);
        message_input.value = '';
    });

    let logout_btn = document.getElementById('logout_btn');
    logout_btn.addEventListener('click', function (event) {
        localStorage.clear();
        document.getElementById("form_container").style.display = 'block';
        document.getElementById("message_container").style.display = 'none';
        socket.emit('leave room ', currentroom, Username);
        currentroom = null;
    });

    let field = document.getElementById('message_input');
    field.addEventListener('keypress',(event)=>{
        if(event.key ==='Enter')
        {
            socket.emit('chat message ',currentroom,message_input.value , Username); //send the message
            message_input.value = ''; //reset the message string
            return false;
        }
    });
    //who send the message + message text
    socket.on('chat message ',(msg,username)=>{
       let who = (name === Username) ? "Me" :name;
       const li =document.getElementById('li');
       li.textContent = who +"-"+msg;
       messages.appendChild(li);
    });
    //user enter  the conversation
    socket.on('create or join conversation',(name)=>{
        if(name ===Username) return ;
        const li =document.getElementById('li');
        li.textContent = "User :" +name + "has joined the room";
        messages.appendChild(li);
    });
    //get this information from browser memeory
    Username = localStorage.getItem('my_name');
    currentroom = localStorage.getItem('room');
    if(Username)
    {
         //Take the username from Login or Signup Form
         document.getElementById('SemailUsername').value =Username;
         document.getElementById('emailUsername').value =Username;
    }
    document.getElementById("form_container").style.display = 'block';
    document.getElementById("message_container").style.display='none';
    document.getElementById('logout').style.display='none';
}