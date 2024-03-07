const passport = require('passport');
const AuthService = require('../services/auth');

async function login(req, res) {
	try {
		const { usernameToLog, passwordToLog } = req.body;

		const user = await AuthService.login(usernameToLog, passwordToLog);

		if (!user) {
			return res.status(401).json({ success: false, message: 'Invalid credentials' });
		}

		req.logIn(user, (err) => {
			if (err) {
				return res.status(500).json({ success: false, message: 'An error occurred' });
			}

			return res.status(200).json({ success: true, message: 'Login successful' });
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: 'An error occurred' });
	}
}

module.exports =  { login };
