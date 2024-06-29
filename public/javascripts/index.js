function init(){
    try {
        loadScoreboards();
    } catch (e) {
        console.error(e);
    }
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
    try {
        const dataBtn = document.getElementById('DataBtn');
        dataBtn.onclick = loadData;
    } catch (e) {
        console.error(e);
    }
    try {
        const signupBtn = document.getElementById('OpenSignupModal');
        signupBtn.onclick = openSignupModal;
    } catch (e) {
        console.error(e);
    }
    try {
        const closeSignupBtn = document.getElementById('CloseSignupModal');
        closeSignupBtn.onclick = closeSignupModal;
    } catch (e) {
        console.error(e);
    }
    try {
        const loginBtn = document.getElementById('OpenLoginModal');
        loginBtn.onclick = openLoginModal;
    } catch (e) {
        console.error(e);
    }
    try {
        const closeLoginBtn = document.getElementById('CloseLoginModal');
        closeLoginBtn.onclick = closeLoginModal;
    } catch (e) {
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

function openSignupModal() {
    var modal = new bootstrap.Modal(document.getElementById('OpenSignupModal'), {
        backdrop: true
    });
    modal.show();
}

function closeSignupModal() {
    var modal = bootstrap.Modal.getInstance(document.getElementById('OpenSignupModal'));
    modal.hide();
}

function openLoginModal(id) {
    var modal = new bootstrap.Modal(document.getElementById('CloseLoginModal'), {
        backdrop: true
    });
    modal.show();
}

function closeLoginModal() {
    var modal = bootstrap.Modal.getInstance(document.getElementById('CloseLoginModal'));
    modal.hide();
}


async function loadScoreboards() {
    try {
        const response = await axios.get('/getScoreBoard');
        const data = response.data;

        const carouselInner = document.getElementById('carousel-inner');
        carouselInner.innerHTML = '';

        Object.keys(data).forEach((league, leagueIndex) => {
            const leagueData = data[league];

            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${leagueIndex === 0 ? 'active' : ''}`;

            const table = document.createElement('table');
            table.className = 'table table-striped';

            const thead = document.createElement('thead');
            thead.innerHTML = `
        <tr>
          <th>Position</th>
          <th>Team</th>
          <th>Played</th>
          <th>Won</th>
          <th>Drawn</th>
          <th>Lost</th>
          <th>Points</th>
        </tr>
      `;
            table.appendChild(thead);

            const tbody = document.createElement('tbody');

            leagueData.forEach((team, index) => {
                const row = document.createElement('tr');

                const positionCell = document.createElement('td');
                positionCell.textContent = index + 1;
                row.appendChild(positionCell);

                const teamCell = document.createElement('td');
                teamCell.textContent = team.team;
                row.appendChild(teamCell);

                const playedCell = document.createElement('td');
                playedCell.textContent = team.played;
                row.appendChild(playedCell);

                const wonCell = document.createElement('td');
                wonCell.textContent = team.won;
                row.appendChild(wonCell);

                const drawnCell = document.createElement('td');
                drawnCell.textContent = team.drawn;
                row.appendChild(drawnCell);

                const lostCell = document.createElement('td');
                lostCell.textContent = team.lost;
                row.appendChild(lostCell);

                const pointsCell = document.createElement('td');
                pointsCell.textContent = team.points;
                row.appendChild(pointsCell);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            carouselItem.appendChild(table);
            carouselInner.appendChild(carouselItem);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}