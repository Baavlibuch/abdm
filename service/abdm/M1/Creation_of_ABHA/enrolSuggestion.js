const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile } = require('../../read_or_write2KeyValues.js');

async function enrolSuggestion(req, res) {
	try{
		const accessToken = readfile('HIP_sessionToken');
		const transactionId = readfile('transactionId');

		const currentTimestamp = new Date();
		const formattedTimestamp = currentTimestamp.toISOString();

		const randomUUID = uuidv4();
		const apiUrl = 'https://abhasbx.abdm.gov.in/abha/api/v3/enrollment/enrol/suggestion';
		const authToken = `Bearer ${accessToken}`;

		/* const { dayOfBirth, 
			email, 
			firstName, 
			lastName, 
			monthOfBirth, 
			yearOfBirth 
		} = req.body; */

		const headers = {
			'User-Agent': 'axios/0.19.2',
                        'Content-Type': 'application/json',
                        'Accept' : '*/*',
                        'Accept-Encoding': 'gzip, deflate, br',
			'TRANSACTION_ID': transactionId,
			'REQUEST-ID': randomUUID,
			'TIMESTAMP': formattedTimestamp,
			'Authorization': authToken,
		};

		/* const requestBody = {
			"dayOfBirth": dayOfBirth,
  			"email": email,
  			"firstName": firstName,
  			"lastName": lastName,
 			"monthOfBirth": monthOfBirth,
  			"txnId": transactionId,
  			"yearOfBirth": yearOfBirth,
		}; */

		const response = await axios.get(apiUrl, { headers });
		//console.log(response.data);
		res.status(200).json(response.data);

	} catch (error) {
		console.error('Error in enrolSuggestion.js: ',error.response ? error.response.data : error.message);
		
	};
};

module.exports = enrolSuggestion;
