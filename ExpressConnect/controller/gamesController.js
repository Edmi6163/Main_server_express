const csvtojson = require('csvtojson')
const Games = require('../models/games')

const games_path = '/Users/eleonoravaleri/Downloads/Assignment\ Data\ 2023-2024/games.csv'

const importGames = async (req,res) => {
	try {
		const games = await csvtojson().fromFile(games_path);
		await Games.insertMany(games);
		res.status(200).json({
			status: 'success',
			data: games_path,
		});

	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
};

module.exports = {importData: importGames}