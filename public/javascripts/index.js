//const { Cookie } = require("express-session");

document.addEventListener('DOMContentLoaded', init);

function init() {
    try {
        loadMostValuedPlayers();
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

        // Salva i dati chiamando la tua funzione saveCredentials
        saveCredentials(url, data);
    }

    async function loadData(event) {
        loadDataAux(event, '/query')
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
        };
        axios.post(url, data)
            .then(response => {
                console.log(response.data);
                const div = document.getElementById('dataRequest');
                div.innerText = JSON.stringify(response.data);
            })
            .catch(error => {
                console.error('Errore durante il caricamento dei dati:', error);
                // TODO: Gestire visivamente che c'è stato un errore durante il caricamento dei dati
            });
    }


    async function loadMostValuedPlayers() {
        try {
            const response = await axios.get('/getMostValuedPlayers');
            console.log("Most valued players: ", response.data);
            const div = document.getElementById('players-value');
            div.innerHTML = '';

            const players = response.data.data.data;
            players.forEach(player => {
                const playerCard = document.createElement('div');
                playerCard.classList.add('col-md-4', 'mb-3');

                playerCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Player ID: ${player.player_id}</h5>
                        <p class="card-text">Market Value: €${player.market_value_in_eur}</p>
                        <p class="card-text">Club ID: ${player.current_club_id}</p>
                    </div>
                </div>
            `;

                div.appendChild(playerCard);
            });
        } catch (error) {
            console.error('Error during data loading: ', error);
        }
    }
async function loadScoreboards() {
    try {
        const response = await axios.get('/getScoreBoard');
        console.log("Score boards:  ", response.data);

        const leagueBoards = response.data.data.data;

        // Per ogni lega nella risposta, riempi la tabella corrispondente
        for (const league in leagueBoards) {
            const leagueData = leagueBoards[league];
            const tableId = `${league}Table`;
            const tbody = document.querySelector(`#${tableId} tbody`);

            if (tbody) {
                tbody.innerHTML = ''; // Pulisci il contenuto della tabella

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
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Chiamare la funzione quando la pagina è caricata
document.addEventListener('DOMContentLoaded', loadScoreboards);

// Chiamare la funzione quando la pagina è caricata
    document.addEventListener('DOMContentLoaded', loadScoreboards);

// Chiamare la funzione quando la pagina è caricata
    document.addEventListener('DOMContentLoaded', loadScoreboards);

// Chiamare la funzione quando la pagina è caricata
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

