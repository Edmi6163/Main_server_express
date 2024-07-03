const PlayerValuations = require('../models/playerValuations');
const axios = require('axios');

async function mostValuedPlayers(req, res) {
	try {
		const players = await PlayerValuations.find({
			last_season: 2023}).sort({valuation: -1}).limit(10);
		let send = await axios.post('http://localhost:3000/showValuedPlayers', {data: players});
		console.log("Data sent successfully");
		return ({success: true, data: send.data});
	} catch (error) {
		console.error("Error finding or sending data: ", error);
	}
}

module.exports = {mostValuedPlayers};