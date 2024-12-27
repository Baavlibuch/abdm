const axios = require('axios');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js');
const { v4: uuidv4 } = require('uuid');


async function updateBridge(req, res) {
 try{
                const baseUrl = readfile('M2_Sandbox_BaseURL');
	 	const M2_AccessToken = readfile('M2_AccessToken');

                const currentTime = new Date();
                const formattedTimestamp = currentTime.toISOString();

                const randomUUID = uuidv4();
                const apiUrl = baseUrl + '/api/hiecm/gateway/v3/bridge/url';

	 	const { bridgeUrl } = req.body;

	 	if (!bridgeUrl) {
			return res.status(400).json({error: 'url is required'});
		};

                const headers = {
			'Authorization': `Bearer ${M2_AccessToken}`,
                        'REQUEST-ID': randomUUID,
                        'TIMESTAMP': formattedTimestamp,
                        'X-CM-ID': 'sbx'
                };

                const requestBody = {
                	"url": bridgeUrl    
		};

                const response = await axios.patch( apiUrl, requestBody, { headers } );
                res.status(200).json(response.data);


        } catch (error) {
                console.error("Error in M2 authTokenAPi.js: ", error.response ? error.response.data : error.message);
        }
};


module.exports = updateBridge;
