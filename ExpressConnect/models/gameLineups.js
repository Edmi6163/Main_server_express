const mongoose = require('mongoose');

const gameLineupsSchema = new mongoose.Schema({
	game_lineups_id:String,
	game_id:Number,
	club_id:Number,
	type:String,
	number: String,
	player_id:String,
	player_name:String,
	team_captain:Boolean,
	position:String
});

module.exports = mongoose.model('GameLineUps',gameLineupsSchema);