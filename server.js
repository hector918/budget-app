// DEPENDENCIES
const https = require("https");
const fs = require("fs");
const ws = require('ws');
const app = require("./app.js");
// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT;

const options = {
  key: fs.readFileSync('./tls/server.key'),
  cert: fs.readFileSync('./tls/server.cert')
};
//////////////////////////////////////
const ws_app = require("./websocket.server");
let server = https.createServer(options, app);
ws_app.https_server_intercept(server);
server.listen(PORT, () => console.log(`Https running on port ${PORT}`));

const wss = new ws.Server({server, path: '/echo'});
ws_app.wss_intercept(wss);







