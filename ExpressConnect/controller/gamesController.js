const csvtojson = require('csvtojson')
const Games = require('../models/games')

const games_path = '/home/francesco/Documents/Università/3_Anno/IUM&TWEB/Eleonora_Francesco_Riccardo/Assignment_Data_2023-2024/games.csv'

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