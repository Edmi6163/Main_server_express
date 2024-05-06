const Games = require('../models/games')
const GameEvents = require('../models/gamesEvents')
const GameLineUps = require('../models/gameLineups')

const dispatcher = async (req, res) => {
	const {model, ...query} = req.query;
	let result;

	switch (model) {
		case 'Games':
			result = await Games.find(query);
			break;
		case 'GameEvents':
			result = await GameEvents.find(query);
			break;
		case 'GameLineUps':
			result = await GameLineUps.find(query);
			break;
		default:
			res.status(400).json({error: 'Model not found'});
			return;
	}
	res.json(result)
};

module.exports = dispatcher;
