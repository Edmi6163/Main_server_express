const axios = require('axios')
const https = require('https')



async function executeSqlQuery(table, endpoint,params) {
	try {
		const queryParams = new URLSearchParams(params);
		const url = `http://localhost:8082/${table}/${endpoint}?${queryParams}`;
		const res = await axios.post(url);
		console.log("received response: ", res.data);
		return res.data;
	} catch (error) {
		throw error;
	}


}

module.exports = { executeSqlQuery }