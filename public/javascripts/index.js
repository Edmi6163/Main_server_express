function init(){
    try {
        const loginBtn = document.getElementById('LoginForm');
        loginBtn.onclick = onLogin;
        const  signBtn = document.getElementById('credentials-btn')
        signBtn.onclick = onSignUp;
    } catch (e){
        console.log(e);
    }
}



function saveCredentials(url,data){
    axios.post(url,data)
      .then(response => {
          console.log(response.data);
      })
      .catch(error => {
          console.error(error);
      });


}

/**
 * called when the submit button is pressed
 * @param event the submission event
 */
function onLogin(event) {
    onLoginAux(event, '/login')
}

function onSignUp(event){
    console.log('sign up button pressed')
    onSignUpAux(event,'/insert')
}


/**
 * called when the submit button is pressed
 * @param event
 * @param url
 * @returns {Promise<void>}
 */
async function onSignUpAux(event,url) {
    // insert username and password got from the Signup form into the mongodb database
    const formData = new FormData(document.getElementById('SignupForm'));
    const data = {};
    for (let entry of formData.entries()) {
        data[entry[0]] = entry[1];
    }
    saveCredentials(url,data);
    event.preventDefault();

}

function onLoginAux(event, url){
}
