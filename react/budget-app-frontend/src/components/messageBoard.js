export default function MsgBoard({msg,setMsg}){
  const on_delete_click = (idx)=>{
    setMsg(pv=>{
      pv.splice(idx,1);
      return [...pv];
    })
  }
  return (
    <div className="m-5 is-pulled-right" style={{maxWidth:"66%"}}>
      {msg.map((el,idx)=>{
        return (
          <article  key={`msg-${idx}`} className="message is-info">
            <div className="message-header">
              <p>{el.title}</p>
              <button className="delete" aria-label="delete" onClick={()=>{on_delete_click(idx)}}></button>
            </div>
            <div className="message-body">{el.body}</div>
          </article>
          
        )
      })}
      
    </div>
  )
}