import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import TransactionForm from "./transaction-form"
import * as srv from "../fetch_";
let init_transaction = {
  item_name: "",
  amount : "",
  date : Date.now(),
  counterparty : "",
  category : ""
};

export default function Edit(){
  let {id} = useParams();
  let navigator = useNavigate();
  
  ////////////////////////////////////////////
  const onsave = (transaction_data)=>{
    srv.update(id,transaction_data,(data)=>{
      
      navigator(`/`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  ////////////////////////////////////////////
  const [transaction , setTransaction] = useState(init_transaction);
  useEffect(()=>{
    //
    srv.read(id,(data)=>{
      if(data===false){
        navigator(`/`);
      }
      setTransaction(data);
      init_transaction = data;
    })
    
  },[])
  ////////////////////////////////////////////
  return (
    <div>
      <h1 className="is-size-2">New Transaction</h1>
      <div className="box p-5 m-5">
        <TransactionForm transaction={transaction} setTransaction={setTransaction} previus_data={init_transaction} onsave={onsave}/>
      </div>

    </div>
  )
}