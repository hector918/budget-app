let API = process.env.REACT_APP_API_URL + "transactions";
let add_message = null;
let setMsgEntry = (func)=>{
  add_message = func;
}
function error_handle (error){
 
  if(add_message)
  { 
    add_message("read error",error.toString());
  }

}

//////////////////////////////////////////////////
function read_total(cb){
  fetch(`${API}/total`)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
function read(text,cb)//get
{
  fetch(`${API}/${text}`)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}

function update(id,body,cb)//put
{
  let options = {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/${id}`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
function del(id,cb)//delete
{
  let options = {
    method: 'DELETE',
    
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}/${id}`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}
function create(body,cb)//post
{
  let options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`${API}`,options)
    .then(response=>response.json())
    .then(data=>{cb(data)})
    .catch(error_handle);
}



export{
  read_total,
  read,
  update,
  del,
  create,
  setMsgEntry,
}