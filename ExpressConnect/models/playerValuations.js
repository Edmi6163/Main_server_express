const mongoose = require('mongoose');

const playerValuationsSchema = new mongoose.Schema({
	player_id: Number,
	last_season: Number,
	datetime: Date,
	date: Date,
	dateweek: Date,
	market_value_in_eur: Number,
	n: Number,
	current_club_id: Number,
	player_club_domestic_competition_id: String
});

const PlayerValuations = mongoose.model('PlayerValuations', playerValuationsSchema);

module.exports = PlayerValuations;