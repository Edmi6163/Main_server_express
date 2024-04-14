var express = require('express');
var router = express.Router();
const importGameEventsController = require('../controller/gameEventsController');
const importGameLineUpController = require('../controller/gameLineUpsController');
const importGamesController = require('../controller/gamesController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/importGameEvents',importGameEventsController.importData);

router.post('/importGameLineUp',importGameLineUpController.importData);

router.post('/importGames',importGamesController.importData);