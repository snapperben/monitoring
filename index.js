const express = require('express');
//const queryRouter = require('routes/queryRouter');
const ingestRouter = require('routes/ingestRouter');
const yaml = require('js-yaml');
const fs   = require('fs');

try {
    const config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
    const port = config.port || 3000;

    const dbManager = require('dbManager');
    dbManager.initiateConnection(config.host, config.uname, config.pass)

    const app = express();
 //   app.use(queryRouter);
    app.use(ingestRouter);

    var server = app.listen(port, () => {
        console.log("Listening on port " + port + "...");
    });

} catch (e) {
  console.log(e);
}
