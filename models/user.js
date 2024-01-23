const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// hash password before saving into database

/**
 * @swagger
 * components:
 *  	schemas:
 *  		User:
 *  			type:object
 *  			properties:
 *  				username:
 *  					type:string
 *  				password:
 *  					type:string
 * @type {Schema}
 */
const User = new mongoose.Schema(
	{
	username: {type: String, required: true, max: 100},
	password: {type: String, required: true, max: 100},
}
);

User.pre('save', function(next) {
	const user = this;
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

User.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', User);