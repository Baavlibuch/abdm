const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function subsRequest(req, res) {
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
<<<<<<< HEAD
                const linkToken = readfile('linkToken');
=======
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/subscription-requests/v3/requests';

<<<<<<< HEAD
		const { limit, offset, filters } = await req.body;
=======
		const { loginToken, limit, offset } = await req.body;
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
<<<<<<< HEAD
			'X-AUTH-TOKEN': linkToken,
                        'X-CM-ID': 'sbx',
			'limit': limit,
			'Offset': offset,
			'Filters': filters  //'GRANTED'
=======
			'X-AUTH-TOKEN': loginToken,
                        'X-CM-ID': 'sbx',
			'limit': limit,
			'Offset': offset,
			'Filters': 'GRANTED'
>>>>>>> 7a3281e15ebf94b30597098a3b64945312c860d6
                      };

    
                const response = await axios.get( apiUrl, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in subsRequest.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }

};

module.exports = subsRequest;


