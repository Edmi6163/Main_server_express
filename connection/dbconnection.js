const mongoDb = 'mongodb://localhost:27017/Credentials';


module.exports = (mongoose) => {
	mongoose.Promise = global.Promise;


	connection = mongoose.connect(mongoDb, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		checkServerIdentity: false,
		family: 4
	}).then(() => {
		console.log('connected to mongodb');

	}).catch((error) => {
		console.log('error connecting to mongodb' + JSON.stringify(error));
	});

}
