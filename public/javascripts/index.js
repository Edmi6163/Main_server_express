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
    document.getElementById('light-mode-btn').addEventListener('click', function() {
        document.body.classList.remove('dark-mode');
        setActiveTheme('light-mode-btn');
    });

    document.getElementById('dark-mode-btn').addEventListener('click', function() {
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
    // Assicurati che il form esista nel DOM prima di procedere
    const form = document.getElementById('SignupForm');
    if (!form) {
        console.error('SignupForm not found in DOM');
        return;
    }

    // Seleziona tutti i label con la classe .form-label all'interno del form
    const labels = form.querySelectorAll('.form-label');

    // Oggetto per salvare i dati
    const data = {};

    // Itera su ogni label per ottenere l'id dell'input associato e il suo valore
    labels.forEach(label => {
        const inputId = label.getAttribute('for');
        const inputElement = document.getElementById(inputId);

        // Verifica se l'elemento esiste prima di accedere alla proprietà value
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
    axios.get('/getMostValuedPlayers')
        .then(response => {
            console.log(response.data);
            const div = document.getElementById('players-value');
            div.innerText = JSON.stringify(response.data);
        })
        .catch(error => {
            console.error('Errore durante il caricamento dei dati:', error);
        });
}

async function loadScoreboards() {
    axios.get('/getScoreBoard')
        .then(response => {
            console.log(response.data);
            const div = document.getElementById('world-cup');
            div.innerText = JSON.stringify(response.data);
        })
        .catch(error => {
            console.error('Errore durante il caricamento dei dati:', error);
        });
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

function closeLoginModal(event) {
    if (event) event.preventDefault();
    var modal = bootstrap.Modal.getInstance(document.getElementById('LoginModalSignin'));
    if (modal) {
        modal.hide();
    }
}