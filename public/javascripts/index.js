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
 * query the server for the login credentials
 * @param event
 * @param url
 * @returns {Promise<void>}
 */
async function onLoginAux(event, url){
    const username = document.getElementById("emailUsername").value;
    const password = document.getElementById("password").value;
    const userData = {
        usernameToLog: username,
        passwordToLog: password
    };

    try {
        const response = await axios.post(url,userData);
        //TODO return a visual thing that the user logged successfully
    } catch (error) {
        console.error(error);
        // TODO return a visual error that the user isn't logged
    }
}

 function onLogin(event) {
     onLoginAux(event, '/login')
}

/**
 * called when the Sign-up  button is pressed
 * @param event the submission event
 */
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
    const labels = document.querySelectorAll("#SignupForm .form-label");

    const data = {};

    labels.forEach(label => {
        const inputId = label.getAttribute('for')
        data[inputId] = document.getElementById(inputId).value;
    });


    saveCredentials(url,data);
    // event.preventDefault();
}



function loadDataAux(event, url) {
    const data = {
        "collection": "games",
        "query": {
            "away_club_name": "Olympique de Marseille",
            "competition_type": "domestic_league",
            "home_club_goals": 4
        },
        "type": "nosql"
    }
    axios.post(url,data)
      .then(response => {
          console.log(response.data);
          const div = document.getElementById('dataRequest');
          div.innerText = JSON.stringify(response.data);
      })
      .catch(error => {
          console.error(error);
      });
    event.preventDefault();

}
/**
 * ask for data to routes /data and the json returned will be displayed in div with id dataRequest, use this json as body for the request:
 * {
 *     "collection": "games",
 *     "query": {
 *         "away_club_name": "Olympique de Marseille",
 *         "competition_type": "domestic_league",
 *         "home_club_goals": 4
 *     },
 *     "type": "nosql"
 * }
 */

async function loadData(event){
    loadDataAux(event,'/query')

}

function openSignupModal(id) {
    var modal = new bootstrap.Modal(document.getElementById('SignupModalSignin'), {
        backdrop: true
    });
    modal.show();
}

function closeSignupModal(id) {
    var modal = bootstrap.Modal.getInstance(document.getElementById('SignupModalSignin'));
    modal.hide();
}

function openLoginModal(id) {
    var modal = new bootstrap.Modal(document.getElementById('LoginModalSignin'), {
        backdrop: true
    });
    modal.show();
}

function closeLoginModal(id) {
    var modal = bootstrap.Modal.getInstance(document.getElementById('LoginModalSignin'));
    modal.hide();
}