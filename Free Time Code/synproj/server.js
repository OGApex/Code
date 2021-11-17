const express = require('express');
const fs = require('fs');
const decache = require('decache');
const app = express();
const cookieParser = require('cookie-parser');


app.use(cookieParser());

global.parseResponse = function(type,data={}){
	return {
		type,
		...data
	}
};

app.use(express.static('www'));

(function(){
	app.get('/v1.0', async function (req, res) {
		var body;
		var action = req.query.action;

		switch(action){
			case "dconsApi":
			case "getArticles":
				var script = './scripts/'+action+'.js';
				console.log("Calling Action:",action);

				try {
					decache(script);
					var result = await require(script)(req);

					res.send(result);
				}
				catch(e){
					res.send(parseResponse("failure_exception"));
					console.log("e", e);
				}

				return;
			break;
			default:
				res.send(parseResponse("failure_action_invalid"));
			break;
		}
	});

	console.log('Booting Server');
	app.listen(777);
	console.log('Server Booted');
})();