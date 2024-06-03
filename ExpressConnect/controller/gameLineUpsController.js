const csvtojson = require('csvtojson');
const GameLineUps= require('../models/gameLineups')

const game_lineup = '/Users/eleonoravaleri/Downloads/Assignment\ Data\ 2023-2024/game_lineups.csv'

const importGameLineUps = async (req,res) => {
	try {
		const gameLineup = await csvtojson().fromFile(game_lineup);
		await GameLineUps.insertMany(gameLineup);
		res.status(200).json({
			status: 'success',
			data: gameLineup,
		});
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
};

module.exports = {importData: importGameLineUps};