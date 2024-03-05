const passport = require('passport');
const User = require('../models/user');

async function login(req, res, next) {
	try {
		const { username, password } = req.body;

		const { user, info } = await passport.authenticate('local')(req, res, next);

		if (info) {
			return res.status(401).json({ success: false, message: info.message });
		}

		await req.logIn(user, (err) => {
			if (err) {
				next(err);
			} else {
				return res.status(200).json({ success: true, message: 'Login successful' });
			}
		});
	} catch (error) {
		next(error);
	}
}

module.exports.login = login;
