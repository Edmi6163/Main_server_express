var express = require('express');
var router = express.Router();
const importGameEventsController = require('../controller/gameEventsController');
const importGameLineUpController = require('../controller/gameLineUpsController');
const importGamesController = require('../controller/gamesController');
const queryController = require('../controller/queryController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/importGameEvents',importGameEventsController.importData);

router.post('/importGameLineUp',importGameLineUpController.importData);

router.post('/importGames',importGamesController.importData);

router.post('/query', async (req,res,next) =>{
  try {
    await  queryController.executeQuery(req,res);
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false, error: err.message});
  }
});
