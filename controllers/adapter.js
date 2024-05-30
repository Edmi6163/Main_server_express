const NoSqlModel = require('../models/NoSqlModels');
const SqlModel = require('../models/SqlModels');


async function query(req,res) {
	try {
		let result;
		const {query,type} = req.body;
		if(type === 'sql'){
			result = await SqlModel.executeSqlQuery(query);
		} else if(type === 'nosql'){
			result = await NoSqlModel.executeNoSql(query);
		} else {
			throw new Error('Invalid query type');
		}
		res.json({success: true,result});
	} catch (error) {
		res.status(500).json({success: false, error:error.message});
	}
}

module.exports = {query};
