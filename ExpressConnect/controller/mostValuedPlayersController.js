const PlayerValuations = require('../models/playerValuations');
const axios = require('axios');

async function mostValuedPlayers(req, res) {
	try {
		const players = await PlayerValuations.find({
			last_season: 2023}).sort({valuation: -1}).limit(10);
		const playersIds = players.map(player => player.player_id);
		const springBootResponse = await axios.get('http://localhost:8080/Player/findByIds', { params: { ids: playerIds } });
		console.log("Spring boot response: ", springBootResponse.data);

        const playerDetails = {};
        springBootResponse.data.forEach(player => {
            playerDetails[player.player_id] = player;
        });

        const playersWithDetails = players.map(player => ({
            ...player._doc,
            name: playerDetails[player.player_id] ? playerDetails[player.player_id].name : 'Unknown',
            current_club_name: playerDetails[player.player_id] ? playerDetails[player.player_id].current_club_name : 'Unknown',
        }));

        let send = await axios.post('http://localhost:3000/showValuedPlayers', { data: playersWithDetails });
        console.log("Data sent successfully");
        return res.json({ success: true, data: send.data });
	} catch (error) {
		console.error("Error finding or sending data: ", error);
	}
}

module.exports = {mostValuedPlayers};