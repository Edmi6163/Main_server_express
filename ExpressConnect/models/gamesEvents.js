const mongoose = require('mongoose');

const gamesEventsSchema = new mongoose.Schema({
	game_event_id: String,
	date: Date,
	game_id: Number,
	minute: Number,
	type: String,
	club_id: Number,
	player_id: Number,
	description: String,
	player_in_id: Number,
	player_assist_id: Number
});

module.exports = mongoose.model('GamesEvents', gamesEventsSchema)