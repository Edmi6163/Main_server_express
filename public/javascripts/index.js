document.addEventListener('DOMContentLoaded', init);

function init() {
    try {
        loadScoreboards();
    } catch (e) {
        console.error(e);
    }
    try {
        const loginBtn = document.getElementById('LoginBtn');
        loginBtn.onclick = onLogin;

    } catch (e) {
        console.error(e);
    }
    try {
        const signBtn = document.getElementById('CredentialBtn');
        signBtn.onclick = onSignUp;
    } catch (e) {
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
        const closeSignupBtn = document.getElementById('SignupCloseModal');
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
    try {
        onlyOneRole();
    } catch (e) {
        console.error(e);
    }
    try {
        document.querySelector('.userRole').addEventListener('change', function(e) {
            if (e.target.checked) {
                document.querySelectorAll('.userRole input[type="checkbox"]').forEach((cb) => {
                    if (cb !== e.target) {
                        cb.checked = false;
                    }
                });
            }
        });
    } catch (e) {
        console.error(e);
    }
    document.getElementById('light-mode-btn').addEventListener('click', function() {
        document.body.classList.remove('dark-mode');
        setActiveTheme('light-mode-btn');
    });

    document.getElementById('dark-mode-btn').addEventListener('click', function() {
        document.body.classList.add('dark-mode');
        setActiveTheme('dark-mode-btn');
    });

    function setActiveTheme(activeBtnId) {
        document.querySelectorAll('.dropdown-item').forEach(function(button) {
            button.classList.remove('active');
            button.setAttribute('aria-pressed', 'false');
        });
        const activeBtn = document.getElementById(activeBtnId);
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-pressed', 'true');
    }
}

function onlyOneRole(){
    const checkBoxes = document.querySelectorAll(".user-role");
    checkBoxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                checkBoxes.forEach((cb) => {
                    if (cb !== e.target) {
                        cb.checked = false;
                    }
                });
            }
        });
    });
}

function saveCredentials(url, data) {
    axios.post(url, data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

async function onLoginAux(event, url) {
    event.preventDefault();
    const username = document.getElementById("emailUsername").value;
    const password = document.getElementById("password").value;
    const userData = {
        usernameToLog: username,
        passwordToLog: password
    };

    try {
        const response = await axios.post(url, userData);
        //TODO return a visual thing that the user logged successfully
    } catch (error) {
        console.error(error);
        // TODO return a visual error that the user isn't logged
    }
}

function onLogin(event) {
    onLoginAux(event, '/login')
}

function onSignUp(event) {
    event.preventDefault();
    onSignUpAux(event, '/insert')
}

async function onSignUpAux(event, url) {
    const labels = document.querySelectorAll("#SignupForm .form-label");

    const data = {};

    labels.forEach(label => {
        const inputId = label.getAttribute('for');
        data[inputId] = document.getElementById(inputId).value;
    });

    saveCredentials(url, data);
}

function loadDataAux(event, url) {
    event.preventDefault();
    const data = {
        "collection": "games",
        "query": {
            "away_club_name": "Olympique de Marseille",
            "competition_type": "domestic_league",
            "home_club_goals": 4
        },
        "type": "nosql"
    };
    axios.post(url, data)
        .then(response => {
            console.log(response.data);
            const div = document.getElementById('dataRequest');
            div.innerText = JSON.stringify(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

async function loadData(event) {
    loadDataAux(event, '/query')
}

function openSignupModal() {
    var modal = new bootstrap.Modal(document.getElementById('SignupModalSignin'), {
        backdrop: 'static', // Disallow closing by clicking on the backdrop
        keyboard: true // Allow closing by pressing ESC
    });
    modal.show();
}

function closeSignupModal(event) {
    if (event) event.preventDefault();
    var modal = bootstrap.Modal.getInstance(document.getElementById('SignupModalSignin'));
    if (modal) {
        modal.hide();
    }
}

function openLoginModal() {
    var modal = new bootstrap.Modal(document.getElementById('LoginModalSignin'), {
        backdrop: 'static', // Disallow closing by clicking on the backdrop
        keyboard: true // Allow closing by pressing ESC
    });
    modal.show();
}
function openProfileModel()
{
    var model= new bootstrap.Modal(document.getElementById('userProfileModal'), {
        backdrop: 'static', // Disallow closing by clicking on the backdrop
        keyboard: true // Allow closing by pressing ESC
    });
}
function closeProfileModel(event)
{
    if(event) event.preventDefault();
    var modal = bootstrap.Modal.getInstance(document.getElementById('userProfileModal'));
    if(modal)
    {
        modal.hide();
    }
}


function closeLoginModal(event) {
    if (event) event.preventDefault();
    var modal = bootstrap.Modal.getInstance(document.getElementById('LoginModalSignin'));
    if (modal) {
        modal.hide();
    }
}
/*
document.addEventListener('DOMContentLoaded', function() {
    // Funzione per gestire il click sul pulsante Save nel modal del profilo
    document.getElementById('SaveProfileBtn').addEventListener('click', function() {
        // Esegue una richiesta per salvare il profilo, incluso l'upload dell'immagine
        // Puoi usare Axios o un'altra libreria per effettuare la richiesta POST
        let formData = new FormData();
        formData.append('username', document.getElementById('username').value);
        formData.append('userEmail', document.getElementById('userEmail').value);
        formData.append('userPhoto', document.getElementById('userPhoto').files[0]); // L'immagine caricata

        axios.post('/login', formData)
            .then(function(response) {
                // Se la richiesta ha successo, aggiorna l'immagine nel dropdown menu
                let profileImage = document.getElementById('profileImage');
                profileImage.src = URL.createObjectURL(document.getElementById('userPhoto').files[0]);

                // Chiudi il modal del profilo
                let userProfileModal = new bootstrap.Modal(document.getElementById('userProfileModal'));
                userProfileModal.hide();
            })
            .catch(function(error) {
                console.error('Errore durante il salvataggio del profilo:', error);
                // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
            });
    });
});
 */
async function loadScoreboards() {
    try {
        console.log('Fetching scoreboards...');
        const response = await axios.get('/getScoreBoard');
        console.log('Data fetched:', response.data);

        const { success, data } = response.data;
        if (!success || !data) {
            console.error('Failed to fetch scoreboards or data is missing.');
            return;
        }

        const leagueData = data; // Accedere ai dati delle leghe correttamente
        console.log('Parsed data:', leagueData);

        const carouselInner = document.getElementById('carousel-inner');
        if (!carouselInner) {
            console.error('Element with ID "carousel-inner" not found.');
            return;
        }

        carouselInner.innerHTML = '';

        Object.keys(leagueData).forEach((league, leagueIndex) => {
            const leagueTeams = leagueData[league];
            console.log(`League: ${league}, Data:`, leagueTeams);

            if (!Array.isArray(leagueTeams)) {
                console.error(`Data for league ${league} is not an array:`, leagueTeams);
                return;
            }

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

            leagueTeams.forEach((team, index) => {
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