var passport = require('passport');
var router = require('express')
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

const users = [
	{id: 1, username: 'admin', password: 'admin'},
	{id: 2, username: 'guest', password: 'guest'}
]

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findby(id, function(err, user) {
		done(err, user);
	});
});

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.findOne({username: username}, function(err, user) {
			if (err) {return done(err);}
			if (!user) {
				return done(null, false, {message: 'Incorrect username.'});
			}
			if (!user.validPassword(password)) {
				return done(null, false, {message: 'Incorrect password.'});
			}
			return done(null, user);
		});
	}
));

module.exports = router;
