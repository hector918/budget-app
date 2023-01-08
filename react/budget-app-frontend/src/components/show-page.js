import { useEffect, useState } from "react"
import * as srv from "../fetch_";
import Timeline from "./timeline";
import TRow from "./transsation-row";
export default function Show(){
  const [ timeline_data, setTimeline_data] = useState({});

  useEffect(()=>{
    //
    function date_compare(adate,bdata){
      let d1 = new Date(adate);
      let d2 = new Date(bdata);
      return d1.getTime()>d2.getTime()?-1:1;
    }
    srv.read("",(data)=>{
      if(data.length===0) return;
      data = data.sort((a,b)=> date_compare(a.date,b.date));
      let tmp = {"Start":[<TRow transaction={{item_name:"Name",amount:"Amount",date:"Date",counterparty:"Counterparty"}}/>]};
      for(let x of data){
        let date_ = new Date(x.date).toLocaleDateString();

        if(tmp[date_]){
          tmp[date_].push(<TRow transaction={x}/>);
        }else{
          tmp[date_]=[<TRow transaction={x}/>];
        }
      }
      setTimeline_data(tmp);
    })
  },[])
  /////////////////////////////////////////////////
  return (
    <div className="panel m-5 p-5">
      <Timeline timeline_data={timeline_data}/>
    </div>
  )
}