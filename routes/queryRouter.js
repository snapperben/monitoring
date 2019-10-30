const express = require('express');
const router = express.Router();

router.get('/retrieve',  async function(request, response) {
	try {
		let argsValid = false,
			startTimeStamp = request.query.start || '',
			endTimeStamp = request.query.end || '';

		argsValid = startTimeStamp !== '' && endTimeStamp !== '';
		if (argsValid !== true) {
			response.status(403).send('Invalid arguments');
		} else {
			let dbManager = require('../dbManager');
			dbManager.queryTimeSeries(startTimeStamp, endTimeStamp).then(function (result) {
				response.status(200).send(result);
			}, function(err){
				response.status(500).send(err);
			})
		}
	} catch (e) {
		response.status(500).send(e);
	}
});

module.exports = router;