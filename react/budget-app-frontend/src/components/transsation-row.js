import { Link, useNavigate } from "react-router-dom";
import "./transaction-row.css";
export default function TRow({transaction}){
  // console.log(transaction)
  let navigator = useNavigate();
  const style_of_row = ()=>{
    if(transaction.amount==="Amount"){
      return "th";
    }else if(transaction.amount>0){
      return "positive";
    }else{
      return "negative";
    }
  }

  const on_delete_click = (evt)=>{
    
    if(window.confirm("confirm delete?"))
    {
      navigator(`/delete/${transaction.index}`);
    }
  }
  return(
    <div className={`columns transaction-row ${style_of_row()}`}>
      <div className="column is-3">{transaction.item_name}</div>
      <div className="column is-3">{transaction.amount}</div>
      <div className="column is-3">{transaction.counterparty}</div>
      {transaction.index!==undefined?
        <div className="column is-3">
          <div className="buttons has-addons is-right">
            <Link to={`/edit/${transaction.index}`} className="button is-info is-outlined is-small">Edit</Link>
            <a onClick={on_delete_click} className="button is-danger is-outlined is-small">Delete</a>
          </div>
        </div>
      
      :
      ""
      }
      
    </div>
  )
}