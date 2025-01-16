const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function subsRequest(req, res) {
        try{
                const M2_AccessToken = readfile('M2_AccessToken');
                const baseUrl = readfile('M2_Sandbox_BaseURL');
                const linkToken = readfile('linkToken');
                const randomUUID = uuidv4();

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const apiUrl = baseUrl + '/api/hiecm/subscription-requests/v3/requests';

		const { limit, offset, filters } = await req.body;

                const headers = {
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'Authorization': `Bearer ${M2_AccessToken}`,
			'X-AUTH-TOKEN': linkToken,
                        'X-CM-ID': 'sbx',
			'limit': limit,
			'Offset': offset,
			'Filters': filters  //'GRANTED'
                      };

    
                const response = await axios.get( apiUrl, { headers } );
                res.status(200).json(response.json)

        } catch (error) {
                console.error('error in subsRequest.js: ', error.response ? error.response.data : error.message)
                res.status(500).json({error: error.message});
        }

};

module.exports = subsRequest;


