const mongoose = require('mongoose');

const mongoDb = 'mongodb://localhost:27017/Credentials';

mongoose.Promise = global.Promise;

connection = mongoose.connect(mongoDb, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	checkServerIdentity: false,
	family: 4
}) .then(() => {
	console.log('connected to mongodb');

}) .catch((error) => {
	console.log('error connecting to mongodb' + JSON.stringify(error));
}