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

//when arrive the rout from another server \query, it shunt to the right mongodb query
router.get('/query', async (req, res) => {
  try {
    const queryRes = await queryData.query(req,res);
    res.json(queryRes);
  } catch(error) {
    res.status(500).json({error: error.message});
  }
});