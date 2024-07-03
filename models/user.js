const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *  	schemas:
 *  		User:
 *  			type: object
 *  			properties:
 *  				username:
 *  					type: string
 *  				password:
 *  					type: string
 */
const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, max: 100 },
	password: { type: String, required: true, max: 100 },
});

// Non è più necessario l'hashing della password

UserSchema.methods.validPassword = function (password) {
	console.log('password:', password);
	return this.password === password; // Confronto diretto della password
};

const User = mongoose.model('User', UserSchema);

module.exports = User;