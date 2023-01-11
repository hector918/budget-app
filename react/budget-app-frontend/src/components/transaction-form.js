import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function TransactionForm({transaction,setTransaction,previus_data,onsave}){
  const [operator, setOperator] = useState("in");
  useEffect(()=>{
    setOperator(previus_data.amount>=0?"in":"out");
  },[previus_data])
  ///////////////////////////////////////////
  // {
  //   item_name: string,
  //   amount : number,
  //   date : date,
  //   counterparty : string,
  //   category : string
  // }
  const on_submit = (evt)=>{
    evt.preventDefault();
    let ret = {};
    if(check_vaild()){
      if(operator==="in"){
        ret = {...transaction,"amount":Math.abs(transaction.amount)};
        setTransaction(ret);
      }else{
        ret = {...transaction,"amount":Math.abs(transaction.amount)*-1};
        setTransaction(ret);
      }
      onsave(ret);
    }
  }
  const on_reset = (evt)=>{
    evt.preventDefault();
    if(window.confirm("confirm reset!"))
    {
      setTransaction({...previus_data});
    }
  }

  const on_change = (evt) =>{
    setTransaction(pv=>({...pv,[evt.target.getAttribute("name")]:evt.target.value}));
  }
  const tab_on_click = (evt) =>{
    if(evt.target.name==="in"){
      setOperator("in");
    }else{
      setOperator("out");
    }
  }
  const calender_on_change = (date)=>{
    setTransaction(pv=>({...pv,date}));
  }
  //////////////
  const check_vaild = ()=>{
    let result = true;
    let mod = {
      item_name: true,
      amount : true,
      date : true,
      counterparty : true,
      category : false
    };
    for(let x in mod){
      if(mod[x]){
        let target = document.querySelector(`#${x}`);
        if(target.value===""){
          target.classList.add("is-danger");
          result = true;
        }else{
          target.classList.remove("is-danger")
        }
      }
    }
    return result;
  }
  ///////////////////////////////////////////
  return (
    <div className={`box has-background-${operator==="in"?"info":"danger"}-light`} style={{maxWidth:"640px",margin:"auto"}}>
      <div className="tabs is-fullwidth is-large">
        <ul onClick={tab_on_click}>
          <li className={operator==="in"?"is-active":""}><a href="#" name="in">In flow</a></li>
          <li className={operator==="out"?"is-active":""}><a href="#" name="out">Out flow</a></li>
        </ul>
      </div>

      <form onSubmit={on_submit}>
        <div className="field">
          <label className="label">Item Name: </label>
          <div className="control">
            <input className="input" type="text" placeholder="e.g Income" value={transaction.item_name} name="item_name" onChange={on_change} id="item_name"/>
          </div>
        </div>
        <div className="field">
          <label className="label">Amount: </label>
          <div className="control">
            <input className="input" type="number" placeholder="e.g 100" value={transaction.amount} name="amount" onChange={on_change} id="amount"/>
          </div>
        </div>
        <div className="field">
          <label className="label">Date: </label>
          <div className="control">
            <DatePicker className="input" name="date" id="date" onChange={calender_on_change} selected={transaction.date}/> 
          </div>
        </div>
        <div className="field">
          <label className="label">Counterparty: </label>
          <div className="control">
            <input className="input" type="text" placeholder="from somewhere or to someone" value={transaction.counterparty} name="counterparty" onChange={on_change} id="counterparty"/>
          </div>
        </div>
        <div className="field">
          <label className="label">Category: </label>
          <div className="control">
            
            <input className="input" type="text" placeholder="e.g Income" value={transaction.category} name="category" onChange={on_change} id="category"/>
          </div>
        </div>
        <div className="buttons is-centered">
          <button className="button is-normal is-responsive is-success">Submit</button>
          <button onClick={on_reset} className="button is-normal is-responsive is-danger">Reset</button>
        </div>
      </form>
    </div>
  )
}