//const { Cookie } = require("express-session");

document.addEventListener('DOMContentLoaded', init);

function init() {
    try {
        // loadMostValuedPlayers();
        loadData();
    } catch (e) {
        console.error(e);
    }
    try {
        loadScoreboards();
    } catch (e) {
        console.error(e);
    }
    try {
        document.addEventListener('DOMContentLoaded', loadScoreboards);

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
            const openLoginBtn = document.getElementById('OpenLoginModal');
            openLoginBtn.onclick = openLoginModal;
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

        // Codice per gestire il click sui pulsanti di tema
        document.getElementById('light-mode-btn').addEventListener('click', function () {
            document.body.classList.remove('dark-mode');
            setActiveTheme('light-mode-btn');
        });

        document.getElementById('dark-mode-btn').addEventListener('click', function () {
            document.body.classList.add('dark-mode');
            setActiveTheme('dark-mode-btn');
        });

        // Funzione per impostare il tema attivo
        function setActiveTheme(theme) {
            localStorage.setItem('activeTheme', theme);
        }

        // Caricare il tema al caricamento della pagina
        loadActiveTheme();
    }

    function loadActiveTheme() {
        const activeTheme = localStorage.getItem('activeTheme');
        if (activeTheme === 'dark-mode-btn') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    function onlyOneRole() {
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
                // Mostra l'alert di successo
                const successAlert = document.getElementById('successAlert');
                if (successAlert) {
                    successAlert.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Errore durante la registrazione:', error);
                // TODO: Gestire visivamente che c'è stato un errore durante la registrazione
            });
    }

    async function onLoginAux(event, url) {
        event.preventDefault();
        const email = document.getElementById("mailLog").value;
        const password = document.getElementById("passwordLog").value;
        const userData = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post(url, userData);
            console.log('Login successful:', response.data);

            // Mostra alert di successo
            const loginSuccessAlert = document.getElementById('loginSuccessAlert');
            if (loginSuccessAlert) {
                loginSuccessAlert.style.display = 'block';
            }

            // Chiudi il modal di login dopo un breve ritardo
            setTimeout(() => {
                closeLoginModal();
            }, 2000); // Chiude dopo 2 secondi (2000 millisecondi)

            // Pulisci i campi del form
            document.getElementById("mailLog").value = "";
            document.getElementById("passwordLog").value = "";

            // TODO: Aggiungi il nome utente nel form del profilo
            const usernameField = document.getElementById('username');
            if (usernameField) {
                usernameField.value = response.data.username; // Supponendo che la risposta contenga il campo username
            }

        } catch (error) {
            console.error('Errore durante il login:', error);
            // TODO: Gestire visivamente che c'è stato un errore durante il login
        }
    }

    function onLogin(event) {
        onLoginAux(event, '/login')
    }

    async function onSignUp(event) {
        event.preventDefault();
        onSignUpAux(event, '/insert')
    }

    async function onSignUpAux(event, url) {
        const form = document.getElementById('SignupForm');
        if (!form) {
            console.error('SignupForm not found in DOM');
            return;
        }

        const labels = form.querySelectorAll('.form-label');

        const data = {};

        labels.forEach(label => {
            const inputId = label.getAttribute('for');
            const inputElement = document.getElementById(inputId);

            if (inputElement) {
                data[inputId] = inputElement.value;
            } else {
                console.error(`Element with id ${inputId} not found`);
            }
        });

        saveCredentials(url, data);
    }

    async function loadData() {
        await loadDataAux( '/query')
    }

 /* async function loadDataAux(event, url) {
        const data = {
            "collection": "games",
            "query": {
                "away_club_name": "Olympique de Marseille",

                "competition_type": "domestic_league",
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
                console.error('Errore durante il caricamento dei dati:', error);
            });
    }
 */

async function loadDataAux(url) {
    const rivalTeams = [
      //asked chatGpt which are the team historical rivals
        ["Paris Saint-Germain", "Olympique de Marseille"],
        ["Olympique Lyonnais", "AS Saint-Étienne"],
        ["Borussia Dortmund", "Schalke 04"],
        ["Bayern Monaco", "Borussia Dortmund"],
        ["Inter", "Milan"],
        ["Roma", "Lazio"],
        ["Manchester United", "Liverpool"],
        ["Arsenal", "Tottenham Hotspur"]
    ];

    try {
        const requests = rivalTeams.map(async ([team1, team2]) => {
            const data = {
                "collection": "games",
                "query": {
                    "$or": [
                        { "home_club_name": team1, "away_club_name": team2 },
                        { "home_club_name": team2, "away_club_name": team1 }
                    ],
                    "competition_type": "domestic_league"
                },
                "type": "nosql"
            };
            const response = await axios.post(url, data);
            return response.data;
        });

        const allResponses = await Promise.all(requests);
        const combinedResults = allResponses.flat();
        console.log("These are all responses: ", combinedResults);

        const dateGroupedResults = combinedResults.reduce((acc, game) => {
            const gameDate = new Date(game.date.$date).toISOString().split('T')[0];
            if (!acc[gameDate]) {
                acc[gameDate] = [];
            }
            acc[gameDate].push(game);
            return acc;
        }, {});

        const sameDateMatches = Object.values(dateGroupedResults).filter(matches => matches.length > 1);

        const filteredData = sameDateMatches.map(matches => matches.map(game => ({
            date: new Date(game.date.$date).toISOString().split('T')[0],
            homeTeam: game.home_club_name,
            awayTeam: game.away_club_name,
            homeGoals: game.home_club_goals,
            awayGoals: game.away_club_goals,
            stadium: game.stadium,
            attendance: game.attendance
        })));

        const div = document.getElementById('dataRequest');
        div.innerHTML = '';
        const table = document.createElement('table');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['Date', 'Home Team', 'Away Team', 'Home Goals', 'Away Goals', 'Stadium', 'Attendance'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.appendChild(document.createTextNode(headerText));
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        filteredData.forEach(matchDay => {
            matchDay.forEach(game => {
                const row = document.createElement('tr');
                Object.values(game).forEach(text => {
                    const cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(text));
                    row.appendChild(cell);
                });
                tbody.appendChild(row);
            });
        });
        table.appendChild(tbody);

        div.appendChild(table);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}



async function loadMostValuedPlayers() {
    try {
        const response = await axios.get('/getMostValuedPlayers');
        console.log("Most valued players: ", response.data);

        const leaguePlayers = response.data.data;
        const carouselInner = document.querySelector('#playersCarousel .carousel-inner');

        // Clear the carousel content
        carouselInner.innerHTML = '';

        let isActive = true;

        // For each league in the response, create and fill the corresponding table
        for (const league in leaguePlayers) {
            const playersData = leaguePlayers[league];
            const tableId = `${league}PlayersTable`;

            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${isActive ? 'active' : ''}`;
            isActive = false;

            const tableHTML = `
                <div class="card mb-3 border border-secondary mx-auto" style="max-width: 500px;">
                    <h3 class="card-header text-center">${league}</h3>
                    <div class="card-body text-center">
                        <div class="table-responsive">
                            <table class="table table-striped table-hover mx-auto" id="${tableId}">
                                <thead>
                                <tr>
                                    <th scope="col" class="text-center">#</th>
                                    <th scope="col" class="text-center">Player ID</th>
                                    <th scope="col" class="text-center">Market Value (€)</th>
                                    <th scope="col" class="text-center">Club ID</th>
                                </tr>
                                </thead>
                                <tbody>
                                ${playersData.map((player, index) => `
                                    <tr>
                                        <th scope="row" class="text-center">${index + 1}</th>
                                        <td class="text-center">${player.player_id}</td>
                                        <td class="text-center">€${player.market_value_in_eur}</td>
                                        <td class="text-center">${player.current_club_id}</td>
                                    </tr>
                                `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;

            carouselItem.innerHTML = tableHTML;
            carouselInner.appendChild(carouselItem);
        }
    } catch (error) {
        console.error('Error during data loading: ', error);
    }
}

document.addEventListener('DOMContentLoaded', loadMostValuedPlayers);
document.addEventListener('DOMContentLoaded', loadData);


async function loadScoreboards() {
    try {
        const response = await axios.get('/getScoreBoard');
        console.log("Score boards:  ", response.data);

        const leagueBoards = response.data.data.data;
        const carouselInner = document.querySelector('.carousel-inner');

        carouselInner.innerHTML = '';

        let isActive = true;

        // Per ogni lega nella risposta, crea e riempi la tabella corrispondente
        for (const league in leagueBoards) {
            const leagueData = leagueBoards[league];
            const tableId = `${league}Table`;

            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${isActive ? 'active' : ''}`;
            isActive = false;

            carouselItem.innerHTML = `
                <div class="card mb-3 border border-secondary mx-auto" style="max-width: 500px;">
                    <h3 class="card-header text-center">${league}</h3>
                    <div class="card-body text-center">
                        <p class="card-text">Classifica ${league}</p>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover mx-auto" id="${tableId}">
                                <thead>
                                    <tr>
                                        <th scope="col" class="text-center">#</th>
                                        <th scope="col" class="text-center">Club</th>
                                        <th scope="col" class="text-center">Points</th>
                                        <th scope="col" class="text-center">Goals</th>
                                        <th scope="col" class="text-center">Goals Against</th>
                                        <th scope="col" class="text-center">Matches</th>
                                        <th scope="col" class="text-center">Won</th>
                                        <th scope="col" class="text-center">Drawn</th>
                                        <th scope="col" class="text-center">Lost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Righe generate dinamicamente -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;

            carouselInner.appendChild(carouselItem);

            const tbody = carouselItem.querySelector(`#${tableId} tbody`);
            leagueData.forEach((team, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row" class="text-center">${index + 1}</th>
                    <td class="text-center">${team.team}</td>
                    <td class="text-center">${team.points}</td>
                    <td class="text-center">${team.goals}</td>
                    <td class="text-center">${team.goalsAgainst}</td>
                    <td class="text-center">${team.matches}</td>
                    <td class="text-center">${team.won}</td>
                    <td class="text-center">${team.drawn}</td>
                    <td class="text-center">${team.lost}</td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadScoreboards);
document.addEventListener('DOMContentLoaded', loadData)

    function openSignupModal() {
        var modal = new bootstrap.Modal(document.getElementById('SignupModalSignin'), {
            backdrop: 'static',
            keyboard: true
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
            backdrop: 'static',
            keyboard: true
        });
        modal.show();
    }

    function closeLoginModal(event) {
        if (event) event.preventDefault();
        var modal = bootstrap.Modal.getInstance(document.getElementById('LoginModalSignin'));
        if (modal) {
            modal.hide();
        }
    }

    const userRole = {
        Fan: 'fan',
        Expert: 'expert',
    };

    function saveUserRole(role) {
        if (role === userRole.Expert) {
            updateNavbarForExpert();
        } else {
            updateNavbarForFan();
        }
        localStorage.setItem('userRole', role);
    }

    function updateNavbarForExpert() {
        const expertLinkContainer = document.getElementById('expertLinkContainer');
        if (expertLinkContainer) {
            expertLinkContainer.style.display = 'block';
        }
        expertLinkContainer.onclick = function () {
            axios.post('')
        }
    }

    function updateNavbarForFan() {
        const expertLinkContainer = document.getElementById('expertLinkContainer');
        if (expertLinkContainer) {
            expertLinkContainer.style.display = 'none';
        }
    }

    function loadUserRole() {
        const savedRole = localStorage.getItem('userRole');
        if (savedRole === userRole.Expert) {
            updateNavbarForExpert();
            document.getElementById('expertRole').checked = true;
        } else {
            updateNavbarForFan();
            document.getElementById('fanRole').checked = true;
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', function (event) {
                event.preventDefault();
                const expertRoleChecked = document.getElementById('expertRole').checked;

                if (expertRoleChecked) {
                    saveUserRole(userRole.Expert);
                } else {
                    saveUserRole(userRole.Fan);
                }
            });
        }

        loadUserRole();
    });
    document.addEventListener('DOMContentLoaded', function () {
        var carouselElement = document.getElementById('scoreboardCarousel');
        carouselElement.addEventListener('slide.bs.carousel', function (e) {
            var $carousel = $(this);
            $('html, body').animate({
                scrollTop: $carousel.offset().top
            }, 0);
        });
    });
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

