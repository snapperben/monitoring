/*

 */
var express = require('express');
var router = express.Router();

router.get('/ingest',  function(request, response) {
  result = '';
  try {
    let argsValid = false,
        status = 200,
        timeStamp = request.query.timestamp || '',
        cpuLoad = request.query.cpuload || '',
        concurrency = request.query.concurrency || '';

    argsValid = timeStamp !== '' && cpuLoad !== '' && concurrency !== ''
    if (argsValid !== true) {
      status = 403;
    } else {
      let dbManager = require('dbManager');
      status = dbManager.insertTimeStamp(timeStamp, cpuLoad, concurrency) ? 200 : 500
    }
  } catch (e) {
	  result = {error:"Failed :"+e};
	  status = 500;
  }
  response.status(status).send(result);
});

module.exports = router;