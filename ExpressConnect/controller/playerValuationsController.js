const csvtojson = require('csvtojson');
const PlayerValuations = require('../models/playerValuations');

const player_valuations = '/home/francesco/Documents/Università/3_Anno/IUM&TWEB/Eleonora_Francesco_Riccardo/Assignment_Data_2023-2024/player_valuations.csv'

const importPlayerValuations = async (req, res) => {
	try {
		const playerValuations = await csvtojson().fromFile(player_valuations);
		await PlayerValuations.insertMany(playerValuations);
		res.status(200).json({
			status: 'success',
			data: playerValuations,
		});
	} catch (err){
		res.status(500).json({
			status: 'fail',
			message: err.message,
		});
	}
}

module.exports = {importData: importPlayerValuations};