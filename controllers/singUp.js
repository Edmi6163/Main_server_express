const User = require('../models/user');

function insert(body) {
	return new Promise((resolve, reject) => {
		const userObj = new User({
			username: body.SemailUsername,
			password: body.Spassword,
		});

		userObj.save()
			.then(result => {
				resolve(result);
			})
			.catch(error => {
				reject(error);
			});
	});
}

module.exports.insert = insert;
