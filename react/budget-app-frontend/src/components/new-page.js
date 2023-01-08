import { useState } from "react"
import { useNavigate } from "react-router-dom";
import TransactionForm from "./transaction-form"
import * as srv from "../fetch_";
const init_transaction = {
  item_name: "",
  amount : "",
  date : Date.now(),
  counterparty : "",
  category : ""
};
/*
   {
    item_name: string,
    amount : number,
    date : date,
    counterparty : string,
    category : string
  }
*/

export default function New(){
  let navigator = useNavigate();

  ////////////////////////////////////////////
  const onsave = (transaction_data)=>{
    srv.create(transaction_data,(data)=>{
      navigator(`/`);
    });
  }
  ////////////////////////////////////////////
  const [transaction , setTransaction] = useState(init_transaction);
  return (
    <div>
      <h1 className="is-size-2">New Transaction</h1>
      <div className="box p-5 m-5">
        <TransactionForm transaction={transaction} setTransaction={setTransaction} previus_data={init_transaction} onsave={onsave}/>
      </div>

    </div>
  )
}