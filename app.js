/*eslint-disable no-unused-vars, no-unused-params*/
const http = require('http');
const https = require('https');
const translatorModule = require('./translator/lib/translator.js');

var portNumber = process.env.VCAP_APP_PORT || 8080;
const server = http.createServer(handleRequests);
server.listen(portNumber, function() {});

function handleRequests(userRequest, userResponse) {
	userResponse.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	const inputData = JSON.stringify({
		"text": [
			"Hello, how are you today?"
		],
		"source": "en",
		"target": "es"
	});

	var callback = function(error, translatorOutput) {
		if (error) {
			userResponse.end(error);
		} else {
			userResponse.end('Translation output: ' + translatorOutput);
		}
	};

	translatorModule.getTranslation(inputData, callback);
}