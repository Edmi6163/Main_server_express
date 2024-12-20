const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const controllerSignUp = require("../controllers/singUp");
const controllerLogin = require("../controllers/login");
const queryAdapter = require("../controllers/adapter");
const sqlQuery = require('../models/SqlModels');
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

//TODO a good comment of this route using swagger style
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
		let type = body.type;
		if(!body.query || !type) {
			res.status(400).json({success: false, error: 'Invalid request'});
		} else {
			axios.post('http://localhost:3001/executeQuery', {query: body, type: type})
				.then(response => {
					res.json(response.data);
				})
				.catch(error => {
					res.status(500).json({success: false, error: error.message});
				});
		}
	}
);


/*
router.route('/query').post(
	function(req,res) {
		let body = req.body;
		let type = req.type;
		if(!body.query || !body.type) {
			res.status(400).json({success: false, error: 'Invalid request'});
		} else {
			axios.post('http://localhost:3001/executeQuery', {query: body, type: type})
				.then(response => {
					res.json(response.data);
				})
				.catch(error => {
					res.status(500).json({success: false, error: error.message});
				});
		}
	}
);

//TODO a good comment of this route using swagger style
router.route('/query').post(
 function(req,res) {
  let body = req.body;
  let type = body.type;
  if(!body.query || !type) {
   res.status(400).json({success: false, error: 'Invalid request'});
  } else {
   axios.post('http://localhost:3001/executeQuery', {query: body, type: type})
    .then(response => {
     res.json(response.data);
    })
    .catch(error => {
     res.status(500).json({success: false, error: error.message});
    });
  }
 }
);


//TODO a good comment of this route using swagger style

router.post('/queryReceived', async (req, res) => {



	try {
		console.log("Query received: ", req.body);
		res.status(200).json(req.body);
	} catch (error) {
		res.status(500).json({error: error.message});
	}

});

//TODO a good comment of this route using swagger style
/**
 *
 */
router.post('/askJava', async (req,res) => {
	try {
		const {table, endpoint, params} = req.body;
		if (!table || !endpoint || !params) {
			res.status(400).json({success: false, error: 'Invalid request'});
		}
		const result = await sqlQuery.executeSqlQuery(table, endpoint, params);
		res.json(result);
	} catch (error) {
		res.status(500).json({success: false, error: error.message});
	}
})


router.get('/getScoreBoard', async (req,res) => {
	try {
		const response = await axios.get('http://localhost:3001/scoreBoard');
		res.json(response.data);
	} catch(err) {
		console.error(err);
		res.status(500).send(err.message);
	}
});

router.get('/getMostValuedPlayers',async (req,res) => {
	try {
		const response = await axios.get('http://localhost:3001/mostValuedPlayers');
		res.json(response.data);
	} catch(err) {
		console.error(err);
		res.status(500).send(err.message);
	}
});



router.post('/showScoreBoard', async (req,res) => {
	try {
		const data = req.body;
		res.json(data);
	} catch(err) {
		res.status(500).send(err.message);
	}
});


router.post('/showValuedPlayers', async (req,res) => {
	try {
		const data = req.body;
		res.json(data);
	} catch(err) {
		res.status(500).send(err.message);
	}
});

module.exports = router;
