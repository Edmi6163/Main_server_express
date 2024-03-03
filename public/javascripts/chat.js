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

}