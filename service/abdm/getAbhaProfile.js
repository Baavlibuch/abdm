const axios = require('axios');
const { readfile, Write2file } = require('./read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');

async function getAbhaProfile(req, res) {
	try{
		const accessToken = readfile('HIP_sessionToken');
		//console.log('access token in Abha Profile :', accessToken);
		const Xtoken = readfile('X-Token');
		//console.log('X-Token in ABha Profile :', Xtoken);
		const randomUUID = uuidv4();
		const time = new Date();
		const formattedTimestamp = time.toISOString();

		//const apiUrl = 'https://healthidsbx.abdm.gov.in/api/v1/account/profile';
		const apiUrl = 'https://abhasbx.abdm.gov.in/abha/api/v3/profile/account';
		
		const headers = {
			'Authorization': `Bearer ${accessToken}`,
			'x-token': `Bearer ${Xtoken}`,
			'Accept': '*/*',
			'Connection':'keep-alive',
			'User-Agent': 'axios/0.19.2',
			'Accepted-Encoding': 'gzip, deflate, br',
			'REQUEST-ID': randomUUID,
			'TIMESTAMP': formattedTimestamp,
		};

		const response = await axios.get( apiUrl, { headers } );
		
		res.status(200).json(response.data);

	} catch (error){
		console.log(error.response ? error.response.data : error.message);
		if (error.response) {
			console.log('Error response data: ', error.response.data);
			console.log('Error response status: ', error.response.status);
			return res.status(error.response.status).json(error.response.data);
		} else {
			console.log('error: ', error.message);
			return res.status(500).json({ error: error.message });
		}
	}
};

module.exports = getAbhaProfile;
