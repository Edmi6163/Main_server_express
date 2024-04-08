const csvtojson = require('csvtojson');
const Games = require('../models/games');

const file_path = '../Assignment_Data_2023-2024/game_events.csv'

const importData = async (req, res) => {
	try {
		const games = await  csvtojson().fromFile(file_path);
		await  Games.insertMany(games);
		res.status(200).json({
			status: 'success',
			data: games,
		});
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}

};

module.exports = {importData};