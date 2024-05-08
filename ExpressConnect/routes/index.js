var express = require('express');
var router = express.Router();
const importGameEventsController = require('../controller/gameEventsController');
const importGameLineUpController = require('../controller/gameLineUpsController');
const importGamesController = require('../controller/gamesController');
const dispatcher = require('../controller/adapter');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/importGameEvents',importGameEventsController.importData);

router.post('/importGameLineUp',importGameLineUpController.importData);

router.post('/importGames',importGamesController.importData);

router.get('/query', async (req, res) => {
  try {
    const queryRes = await dispatcher(req,res);
    res.json(queryRes);
  } catch(error) {
    res.status(500).json({error: error.message});
  }
});