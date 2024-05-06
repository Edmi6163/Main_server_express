/** controller that send to query data to another server and return the response use axios
 * the query to send is generic, the other server will decide how to handle and request the correct data to mongodb
 */
async function query(req,res){
		try {
				const data = req.body;
				const response = await axios.post('http://localhost:3001/query/',data);
				res.json(response.data);
		} catch (error) {
				res.status(500).json({error: error.message});
		}
	}

module.exports =  { query };


