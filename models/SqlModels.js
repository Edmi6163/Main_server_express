const axios = require('axios')
const https = require('https')

const SPRING_BOOT_URL = 'http://localhost:8081'


async function executeSqlQuery(query) {
	try {
		const res = await axios.post(SPRING_BOOT_URL, {params: {query}});
		return res.data;
	} catch (error) {
		throw error;
	}
}

module.exports = { executeSqlQuery }