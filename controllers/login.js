const AuthService = require('../services/auth');

async function login(req, res) {
	try {
		const { usernameToLog, passwordToLog } = req.body;

		const user = await AuthService.login(usernameToLog, passwordToLog);

		if (!user) {
			return { success: false, message: 'Invalid credentials' };
		}

		// Autenticazione utente tramite Passport.js
		req.logIn(user, (err) => {
			if (err) {
				throw new Error('An error occurred during login');
			}

			res.json({ success: true, message: 'Login successful' });
		});
	} catch (error) {
		return { success: false, message: error.message };
	}
}

module.exports = { login };