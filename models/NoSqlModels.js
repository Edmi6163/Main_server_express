const axios = require('axios');
const {response} = require("express");

const EXPRESS_URL = 'https://localhost:3001';

async function executeNoSql(query) {
	try {
		const res = await axios.get(EXPRESS_URL, {params: {query}});
		return res.data;
	} catch (error) {
		throw error;
	}
}

module.exports = { executeNoSql }