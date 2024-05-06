const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const controllerSignUp = require("../controllers/singUp");
const controllerLogin = require("../controllers/login");
const queryController = require("../controllers/queryData");
var bodyParser = require('body-parser');
router.use(bodyParser.json());


router.post('/insert', async (req, res) => {
	try {
		const labelData = req.body;
		const results = await controllerSignUp.insert(labelData);
		res.json(results)
	} catch (error) {
		res.status(500).json({error: error.message});
	}
});

router.post('/login', async (req, res) => {
	try {
		const loginRes = await controllerLogin.login(req,res);
		res.json(loginRes);
	} catch (error) {
		res.status(500).json({error: error.message});
	}
});


router.post('/query', async (req, res) => {
	try {
		const queryRes = await queryController.queryInfo(req,res);
		res.json(queryRes);
	} catch(error) {
		res.status(500).json({error: error.message});
	}
});


module.exports = router;


