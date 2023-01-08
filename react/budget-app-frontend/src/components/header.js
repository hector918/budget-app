import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import * as srv from "../fetch_";

export default function Header({setMsg}){
  const [ balance, setBalance] = useState(0);

  
  ////////////////////////////////////////////////
  useEffect(()=>{

    let wss = new WebSocket(process.env.REACT_APP_WSAPI_URL);
    // console.log(wss)
    wss.onmessage = (event)=>{
      // console.log(event);
      let json;
      try {
        json = JSON.parse(event.data);
        if(json['message']){
          setMsg(pv=>[...pv,{title:"message from websocket",body:json.message}]);
        }
        if(json['balance']){
          setBalance(json['balance']);
        }
      } catch (error) {
        setMsg(pv=>[...pv,{title:"error",body:error.toString()}]);
      }
    
    };
    wss.onopen = (evt)=>{
      console.log("wss open",evt);
    }
    wss.onclose = (evt)=>{
      console.log("wss close",evt);
    }
  },[]);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item is-size-1 has-text-weight-bold" >
          Budget App
        </Link>

      </div>

      <div id="navbarBasicExample" className="navbar-menu" style={{display:"flex"}}>
        <div className="navbar-start">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/new" className="button is-primary">New Transaction</Link>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          
          <div className="navbar-item">
            <p className="title is-3">Balance: <span className="button is-success is-light">{balance}</span></p>
            
          </div>
        </div>
      </div>
    </nav>
    
  )
}