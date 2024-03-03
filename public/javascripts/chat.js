const socket = io();
let Username="";
let date_snd="";
let currentroom="";
function init()
{
    const messages = document.getElementById('messages');
    const message_input  =document.getElementById('message_input');
    const send_message_btn = document.getElementById('send_btn');

    send_message_btn.addEventListener('click',function (){
        socket.emit('chat message',currentroom , message_input.value ,Username);
        message_input.value='';
    });
}
