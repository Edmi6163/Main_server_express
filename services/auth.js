const User = require('../models/user');
const passport = require('passport');

async function login(username,password){
	const user = await User.findOne({username});

	if(!user || !user.validPassword(password)){
		return null;
	}
	return user;
}

module.exports = {
	login,
};