function on_wss_upgrade(req, res, head) {
  console.log('UPGRADE:', req.url)
}
function on_wss_error(err){
  console.error(err);
}
function https_server_intercept(server){
  server.on("upgrade",on_wss_upgrade);
  server.on("error",on_wss_error);
}
////////////////////////////////////////////////
const budget_data = require("./models/budget.model");
const conections = new Map();
function on_wss_connection(wss,req){

  conections.set("only onew client",{wss,req});
  wss.send(JSON.stringify({"message":"connected with websocket","balance":budget_data.read_total()}));
  // console.log("status",wss.readyState,conections.get("only onew client")["wss"].readyState)
  budget_data.change_websocket_hook(conections.get("only onew client")["wss"]);
}
function on_wss_message(data){
  console.log(data)
  // wss.send('Receive: ' + data);
}
function wss_intercept(wss){
  wss.on('connection', on_wss_connection);
  wss.on('message', on_wss_message);
}

module.exports = {
  https_server_intercept,wss_intercept
};