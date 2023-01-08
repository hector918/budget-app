const express = require("express");
const transactions = express.Router();
const budget_data = require("../models/budget.model");
//read

transactions.get("/",( r, s )=>{
  s.send(budget_data.read_all());
})
transactions.get("/total",( r, s )=>{
  s.send({"total":budget_data.read_total()});
})

transactions.get("/:id",( r, s )=>{

  const {id} = r.params;
  let ret = budget_data.read_by_id(id);
  s.send(ret);
})


//create
transactions.post("/",( r, s )=>{
  let ret = budget_data.create(r.body);
  s.send(ret);
})
//put
transactions.put("/:id",( r, s )=>{
  const {id} = r.params;
  let ret = budget_data.update_by_id(id,r.body);
  s.send(ret);
})

//delete
transactions.delete("/:id",( r, s )=>{
  const {id} = r.params;
  let ret = budget_data.delete_by_id(id);
  s.send(ret);  
})


module.exports = transactions;