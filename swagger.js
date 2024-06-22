/**
 * following these docs:
 * https://swagger-autogen.github.io/docs/getting-started/quick-start
 */

const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})

const doc = {
	info: {
		title: 'Ium Tweb final assignment api',
		description: 'OpenApi swagger docs for final assignment'
	},
	host:'localhost:3000'
};

const outputFile = './swagger/swaggerDocumentation.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile,routes,doc);