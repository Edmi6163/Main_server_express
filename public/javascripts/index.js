const axios = require("axios");
const User = require('../../models/user')
function init(){
    try {
        const loginBtn = document.getElementById('LoginForm');
        loginBtn.onclick = onLogin;
        const  signBtn = document.getElementById('signup-modal')
        signBtn.onclick = onSignUp;
    } catch (e){};
}

/**
 * called when the submit button is pressed
 * @param event the submission event
 */
function onLogin(event) {
    onLoginAux(event, '/login')
}

function onSignUp(event){
    onSignUpAux(event,'/insert')
}

async function onSignUpAux(event,url) {
    const username = event.username;
    const password = event.password;

    try {
        const response = await axios.post(url, {
            username: username,
            password: password
        });
        console.log(response);
    } catch(error) {
        console.error(error);
    }

}

function onLoginAux(event, url){
}