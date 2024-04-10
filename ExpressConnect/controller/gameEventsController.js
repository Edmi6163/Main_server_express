const csvtojson = require('csvtojson');
const GamesEvents = require('../models/gamesEvents');

const game_events = '/home/francesco/Documents/Università/3_Anno/IUM&TWEB/Eleonora_Francesco_Riccardo/Assignment_Data_2023-2024/game_events.csv'

const importGamesEvents = async (req, res) => {
	try {
		const gamesEvents = await  csvtojson().fromFile(game_events);
		await  GamesEvents.insertMany(gamesEvents);
		res.status(200).json({
			status: 'success',
			data: gamesEvents,
		});
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}

};


module.exports = {importData: importGamesEvents};