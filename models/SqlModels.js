const axios = require('axios')

const SPRING_BOOT_URL = 'https://localhost:8081'
async function executeSqlQuery(query) {
	try {
		const res = await axios.get(SPRING_BOOT_URL, {params: {query}});
		return res.data;
	} catch (error) {
		throw error;
	}
}

module.exports = { executeSqlQuery }