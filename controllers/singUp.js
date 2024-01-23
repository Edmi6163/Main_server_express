const Model = require('../models/user');

function insert(body){
	return new Promise((resolve,reject) => {
		const mongoObj = new Model(body);
		mongoObj.save().then(res => {
			resolve(res);
		})
			.catch(error => {
				reject(error);
			});
	});
}

module.exports.insert = insert;