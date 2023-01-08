const budget_map = new Map(
  Object.entries(
    {
      '0' : {
        item_name: 'income',
        amount: 99,
        date: 1673629644000,
        counterparty: 'work',
        category: '',
        delete: false,
        index: '0'
      },
      '1' : {
        item_name: 'food',
        amount: -8,
        date: 1673629644000,
        counterparty: 'nothing restaurant',
        category: 'food',
        delete: false,
        index: '1'
      },
      '2' : {
        item_name: 'food',
        amount: -9,
        date: 1673629644000,
        counterparty: 'nothing restaurant',
        category: 'food',
        delete: false,
        index: '2'
      },
      '3' : {
        item_name: 'income',
        amount: 65,
        date: 1673195816530,
        counterparty: 'work',
        category: '',
        delete: false,
        index: '3'
      }
    }
  )
)
let websocket_total;
function data_change_hook(){
  if(websocket_total!==undefined){
    let ret = JSON.stringify({"balance":read_total()});
    websocket_total.send(ret);
    console.log("hook triggered",websocket_total.readyState,ret);

  }
}
function change_websocket_hook(wss){
  websocket_total = wss;
  
}

function read_total(){
  let ret = 0;
  for(const [key,value] of budget_map){
    if(!value.delete){
      ret += Number(value.amount);
    }
  }
  return ret;
}
function read_all(){
  let ret = [];
  for(const [key,value] of budget_map){
    if(!value.delete){
      let tmp = {...value};
      delete tmp.delete;
      ret.push(tmp);
    }
  }

  return ret;
}
function read_by_id(id){
  if(!budget_map.has(id)) return false;
  let ret = budget_map.get(id);
  if(!ret.delete){
    let tmp = {...ret};
    delete tmp.delete;
    return ret;
  }
  else{
    return false;
  }
}
function create(body){
  let id = budget_map.size.toString();
  body.date = new Date(body.date).getTime();
  body['delete'] = false;
  body['index'] = id;
  budget_map.set(id,body);
  data_change_hook();

  return read_by_id(id);
}
function update_by_id(id,body){
  if(budget_map.has(id)){
    budget_map.set(id,body);
    data_change_hook();

    return read_by_id(id);
  }
  else{
    data_change_hook();

    return false;
  }
}
function delete_by_id(id){
  if(budget_map.has(id)){
    let body = budget_map.get(id);
    body.delete = true;
    budget_map.set(id,body);
    data_change_hook();
    return true;
  }
  else{
    data_change_hook();
    return false;
  }
}
module.exports = {
  read_total,read_all,read_by_id,create,update_by_id,delete_by_id,change_websocket_hook
};