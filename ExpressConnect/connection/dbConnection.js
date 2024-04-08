const url = "mongodb://root:credential_password@localhost:27018/"

module.exports = (mongoose) => {
	mongoose.Promise = global.Promise;

	connection = mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		checkServerIdentity: false,
		family: 4
	}).then(() => {
		console.log('connected to mongodb for credentials');
	}).catch((error) => {
		console.log('error connecting to mongodb' + JSON.stringify(error));
	});
}