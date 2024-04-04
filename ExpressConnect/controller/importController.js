const fs = require('fs');
const Games = require('../models/games');

const file_path = '../Assignment_Data_2023-2024/game_events.csv'

const importData = (req, res) => {
	fs.createReadStream(file_path).pipe(csv()).on('data', (row) => {
			const games = new Games({
				game_id: row.game_id,
				competition_id: row.competition_id,
				season: row.season,
				round: row.round,
				date: row.date,
				home_club_id: row.home_club_id,
				away_club_id: row.away_club_id,
				home_club_goals: row.home_club_goals,
				away_club_goals: row.away_club_goals,
				home_club_position: row.home_club_position,
				away_club_position: row.away_club_position,
				home_club_manager_name: row.home_club_manager_name,
				away_club_manager_name: row.away_club_manager_name,
				stadium: row.stadium,
				attendance: row.attendance,
				referee: row.referee,
				url: row.url,
				home_club_formation: row.home_club_formation,
				away_club_formation: row.away_club_formation,
				home_club_name: row.home_club_name,
				away_club_name: row.away_club_name,
				aggregate: row.aggregate,
				competition_type: row.competition_type,
			});
			game.save().then(() => console.log('game saved')).catch((err) => console.error('Error saving game', err));

			}).on('end', () => {
				console.log('CSV file successfully processed');
				res.send('Data imported');
			});
};

module.exports = {importData};