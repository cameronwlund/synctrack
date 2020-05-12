// Strava Oauth2.0 Authorization URL
const authorizationURL = 'https://www.strava.com/oauth/authorize';
const client_id = 47389;
const redirect_uri = 'http://localhost:8080'
const response_type = 'code';
const scope = 'read,activity:read';
const oauthURL = `${authorizationURL}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`;


//Page Elements
$startButton = $('#startButton').attr('href',oauthURL);


// READS URL TO COLLECT CODE FROM OAUTH2
const getParams = (url) => {
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
}

let urlParams = getParams(window.location.href);

const tokenAuthorization = async (code) => {
  try {
    const response = await fetch('https://www.strava.com/oauth/token'), {
      method: 'POST',
      body: JSON.stringify({
        client_id:'4739',
        client_secret: '4dc099707eaa2abd7e5ed27c1466e152c0034a20',
        code: code,
        grant_type: 'authorization_code'
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
    throw new Error('Request Failed!');
  } catch(error) {
    console.log(error);
  }
};

const getToken = (code) => {
  if (code) {
    tokenAuthorization(code);
  }
}

getToken(urlParams.code);
