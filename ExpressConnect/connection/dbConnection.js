const url = "mongodb://root:other_data_password@localhost:27019"

module.exports = (mongoose) => {
	mongoose.Promise = global.Promise;
	connection = mongoose.connect(url, {
		family: 4
	}).then(() => {
		console.log('connected to mongodb for data');
	}).catch((error) => {
		console.log('error connecting to mongodb' + JSON.stringify(error));
	});
}