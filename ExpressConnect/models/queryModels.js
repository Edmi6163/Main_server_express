const GameLineUps = require('../models/gameLineups')
const Games = require('../models/games')
const GamesEvents = require('../models/gamesEvents')

async function executeQuery(query,type) {
	try {
		let res;
		switch (type){
			case 'games':
				res = await Games.find(query);
				break;
			case 'gameLineUps':
				res = await GameLineUps.find(query);
				break;
			case 'gameEvents':
				res = await GamesEvents.find(query);
				break;
			default:
				throw  new Error('Invalid query type');

		}
		return res;
	} catch (error) {
		throw error;
	}
}

module.exports = { executeQuery }