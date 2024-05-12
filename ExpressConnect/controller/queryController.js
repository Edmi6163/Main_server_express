const queryModel = require('../models/queryModels')

async function executeQuery(req,res) {
	try {
		const {query,type} = req.body;

		const res = await queryModel.queryIdentifier(query,type);
		console.log("res received is: ", res);
		res.json({success: true, res});

	} catch (error){
		res.status(500).json({success: false, error: error.message});
	}

}

module.exports = {executeQuery}