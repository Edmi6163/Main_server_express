var express = require('express');
var router = express.Router();
const importController = require('../controller/importController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/import',importController.importData);

