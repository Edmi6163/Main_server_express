const axios = require('axios');
var express = require('express');
var router = express.Router();
const importGameEventsController = require('../controller/gameEventsController');
const importGameLineUpController = require('../controller/gameLineUpsController');
const importGamesController = require('../controller/gamesController');
const queryController = require('../controller/queryController')
const scoreBoardController = require('../controller/scoreboardsController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/importGameEvents',importGameEventsController.importData);

router.post('/importGameLineUp',importGameLineUpController.importData);

router.post('/importGames',importGamesController.importData);

router.post('/executeQuery', async (req, res, next) =>{
  try {
    const result = await  queryController.executeQuery(req,res);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false, error: err.message});
  }
});



router.get('/scoreBoard', async (req,res) => {
  try {
    const result = await scoreBoardController.calculateScore();
    console.log(result);
    //write result in to route /showScoreBoard so it receive the scoreboard and it will show it in front end
    //await axios.post('http://localhost:3000/showScoreBoard', {data: result});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({success: false, error: err.message});
  }
});