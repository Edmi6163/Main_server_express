const mongoose = require('mongoose');

const clubsSchema = new mongoose.Schema({
    club_id:String,
    club_code:String,
    name:String,
    domestic_competition_id:String,
    total_market_value:String,
    squad_size:Number,
    average_age:Number,
    foreigners_number:Number,
    foreigners_percentage:Number,
    national_team_players:Number,
    stadium_name:String,
    stadium_seats:String,
    net_transfer_record:String,
    coach_name:String,
    last_season:Number,
    url:String,
});

module.exports = mongoose.model('clubs', clubsSchema)