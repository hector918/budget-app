// import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as srv from "./fetch_";
////////////////////////////////////////
import Welcome from './components/welcome-page';
import MsgBoard from './components/messageBoard';
import Header from './components/header';
import Show from './components/show-page';
import New from './components/new-page';
import Edit from './components/edit-page';
import Delete from './components/delete-page';

/////////////////////////////////

function App() {
  const [ msg, setMsg ] = useState([]);
  srv.setMsgEntry((title,body)=>{
    setMsg(pv=>{return [...pv,{title,body}]});
  });
  
  return (
    <div className='app'>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"></link>
      <Router>
        <Header setMsg={setMsg}/>
        <Routes>
          <Route path="/" element={<Show/>} />
          <Route path="/new" element={<New/>} />
          <Route path="/edit/:id" element={<Edit/>} />
          <Route path="/delete/:id" element={<Delete/>} />
          <Route path="*" element={<Welcome/>} />
        </Routes>
        <MsgBoard msg={msg} setMsg={setMsg}/>
      </Router>
    </div>
  );
}
export default App;
