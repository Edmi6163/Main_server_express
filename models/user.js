var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
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
const userSchema = new Schema({
	username: String,
	password: String
});

// hash password before saving into database
userSchema.pre('save', function(next) {
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

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}