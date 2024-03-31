function init(){
    try {
        const loginBtn = document.getElementById('LoginBtn');
        loginBtn.onclick = onLogin;

    } catch (e){
        console.error(e);
    }
    try {
    const  signBtn = document.getElementById('CredentialBtn')
    signBtn.onclick = onSignUp;
    } catch(e) {
        console.error(e);
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
    const labels = document.querySelectorAll("#SignupForm .form-label");

    const data = {};

    labels.forEach(label => {
        const inputId = label.getAttribute('for')
        data[inputId] = document.getElementById(inputId).value;
    });


    saveCredentials(url,data);
    // event.preventDefault();

}

function onLoginAux(event, url){
}

function openModal(id) {
    var modal = new bootstrap.Modal(document.getElementById('modalSignin'), {
        backdrop: false
    });
    modal.show();
    }

function closeModal(id) {
    var modal = bootstrap.Modal.getInstance(document.getElementById('modalSignin'));
    modal.hide();
    }

