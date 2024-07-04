const queryModel = require('../models/queryModels')
const axios = require('axios');

async function executeQuery(req,res) {
	try {
		console.log("req in query controller is: ", req.body.query)
		const res = await queryModel.queryIdentifier(req);
		console.log("res in query controller is: ", res)
		const send = await axios.post('http://localhost:3000/queryReceived', {data: res});
		return ({success: true, data: send.data});

	} catch (error){
		throw  error;
	}

}

module.exports = {executeQuery}