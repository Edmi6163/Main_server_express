const queryModel = require('../models/queryModels')

async function executeQuery(req,res) {
	try {
		const {query,type} = req.body;

		const res = await queryModel.executeQuery(query,type);
		res.json({success: true, result});

	} catch (error){
		res.stat(500).json({success: false, error: error.message});
	}

}

module.exports = {executeQuery}