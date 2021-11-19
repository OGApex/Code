const express = require('express');
const fs = require('fs');
const decache = require('decache');
const app = express();
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(express.json());

global.parseResponse = function(type,data={}){
	return {
		type,
		...data
	}
};

app.use(express.static('./www'));


(function(){
	app.post('/v1.0', async function (req, res) {
		var action = req.body.action;
		switch(action){
            case "holiday_fetch":
				var script = './scripts/'+action+'.js';
				console.log("Calling Action:",action);
				try {
					decache(script);
					var result = await require(script)(req);
                    console.log("result", req.params);
					res.send(result);
				}
				catch(e){
					res.send(parseResponse("failure_exception"));
					console.log("e", e);
				}

				return;
			default:
				res.send(parseResponse("failure_action_invalid"));
			break;
		}
	});

	console.log('Booting Server');
	app.listen(777);
	console.log('Server Booted');
})();