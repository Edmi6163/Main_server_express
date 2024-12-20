const User = require('../models/user');

function insert(body) {
	return new Promise((resolve, reject) => {
		const userObj = new User({
			username: body.SemailUsername,
			password: body.Spassword,
		});

		userObj.save()
			.then(result => {
				console.log('insert result', result)
				resolve(result);
			})
			.catch(error => {
				console.error('error saving user in mongodb', error)
				reject(error);
			});
	});
}

module.exports.insert = insert;