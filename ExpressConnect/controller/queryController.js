const queryModel = require('../models/queryModels')
const axios = require('axios');

async function executeQuery(req,res) {
	try {

		const res = await queryModel.queryIdentifier(req);
		const send = await axios.post('http://localhost:3000/queryReceived', {data: res});
		console.log("sent to other server",send);
		res.json({success: true, send});

	} catch (error){
		res.status(500).json({success: false, error: error.message});
	}

}

module.exports = {executeQuery}