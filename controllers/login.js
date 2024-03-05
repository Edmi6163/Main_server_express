const passport = require('passport');
const User = require('../models/user');

function login(req,res,next){
	passport.authenticate('local', function(err,user,info) {
		if (err) {
			return next(err);
		}
		if(!user){
			return res.status(401).json({success: false, message: info.message});
		}
		req.logIn(user,function(err){
			if(err){
				return next(err);
			}
			return res.status(200).json({success: true, message: 'Login successful'})
		});
	})(req,res,next);
}

module.exports.login = login;