const axios = require('axios');
async function queryInfo(req,res){
		try {
				const data = req.body;
				const response = await axios.post('http://localhost:3001/query',data);
				res.json(response.data);
		} catch (error) {
				res.status(500).json({error: error.message});
		}
	}

module.exports =  { queryInfo };


