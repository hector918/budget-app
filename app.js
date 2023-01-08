const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
/////////////////////////////////////////////
///*/pursuit/m4/budget-app/react/budget-app-frontend/build/index.html
app.use(express.static('./react/budget-app-frontend/build'))
/////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("Hello budget world!");
});
/////////////////////////////////////////////
const transactions_controller = require("./controllers/budget.controller");
app.use("/transactions", transactions_controller);
/////////////////////////////////////////////
app.get("*", (req, res) => {
  res.status(404).send("no page found!");
});
////////////////////////////////////////////////
module.exports = app;