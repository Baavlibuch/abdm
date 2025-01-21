const axios = require('axios');
const { readfile, Write2file } = require('./read_or_write2KeyValues.js');

async function getAccessToken() {
  let timestamp = new Date();
  // const axios = require('axios');
  const url = 'https://dev.abdm.gov.in/gateway/v0.5/sessions';

  // const clientSecret = readfile('clientSecret');
  const requestData = {
    'clientId': 'SBX_002928', // 'SBX_002928'
    'clientSecret':'5b24ab9e-2194-4f5f-aca3-fdb0a4872312' //'5b24ab9e-2194-4f5f-aca3-fdb0a4872312'
  };

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'User-Agent': 'axios/0.19.2',
    'Content-Length': 80,
    'Accept': 'application/json, text/plain, */*'
  };

  return axios
    .post(url, requestData, { headers })
    .then((response) => {
      console.log("Gateway Auth axios.then. time = ", new Date() - timestamp)
      let { accessToken, expiresIn, refreshExpiresIn, refreshToken, tokenType } = response.data;
      console.log("Authorized clientID and ClientSecret Key");
      Write2file('HIP_sessionToken', accessToken);
            //console.log('Access token received in app.js', accessToken);
      /*return updateHealthRepoUrl(accessToken, refreshToken, timestamp)
        .then(() => {
          console.log("--------> updateHealthRepoUrl")
          return addHipToTheBridgeAndEnterRegistry(accessToken, timestamp)
            .then((addHipResponse) => {
              console.log('\n');
              console.log('Suceesfully Registered as Health Information Provider(HIP)');
              console.log("Configurations of the Response  from addHipToTheBridgeAndEnterRegistry:");
              console.log('Status addHipToTheBridgeAndEnterRegistry------>  ', addHipResponse.status);

// Print the response data
            });
        });*/

    })
    .catch((error) => {
      console.error('Gateway Auth axios.fetch error caught: ', error);
    });
}

module.exports = getAccessToken;
