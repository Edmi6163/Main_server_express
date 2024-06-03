const GameLineUps = require('../models/gameLineups')
const Games = require('../models/games')
const GamesEvents = require('../models/gamesEvents')
const Clubs = require('../models/clubs')

async function queryIdentifier(req) {
	try {
		const { collection, query, projection} = req.body.query;
		let res;
		switch (collection){
			case 'games':
				res = await Games.find(query, projection);
				break;
			case 'gameLineUps':
				res = await GameLineUps.find(query, projection);
				break;
			case 'gameEvents':
				res = await GamesEvents.find(query, projection);
				break;
			case 'clubs':
				res = await Clubs.find(query, projection);
				break;
			default:
				throw  new Error('Invalid query type');

		}
		return res;
	} catch (error) {
		throw error;
	}
}

module.exports = { queryIdentifier }