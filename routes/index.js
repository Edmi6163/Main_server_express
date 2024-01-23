const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const controller = require("../controllers/singUp");
var bodyParser = require('body-parser');
router.use( bodyParser.json() );



router.post('/insert', async (req,res) => {
  try {
    const labelData = req.body;
    const results = await controller.insert(labelData);
    res.json(results)
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

  module.exports = router;


