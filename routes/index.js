const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const controllerSignUp = require("../controllers/singUp");
const controllerLogin = require("../controllers/login");
const queryAdapter = require("../controllers/adapter");
const bodyParser = require('body-parser');
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


router.route('/query').post(
	function(req,res) {
		let body = req.body;
		let type = req.type;
		if(!body.query || !body.type) {
			res.status(400).json({success: false, error: 'Invalid request'});
		} else {
			axios.post('http://localhost:3001/query', {query: body, type: type})
				.then(response => {
					res.json(response.data);
				})
				.catch(error => {
					res.status(500).json({success: false, error: error.message});
				});
		}
	}
);



module.exports = router;


