import { useNavigate, useParams } from "react-router-dom";
import * as srv from "../fetch_";

export default function Delete(){
  let navigator = useNavigate();
  let {id} = useParams();
  srv.del(id,(data)=>{
    navigator("/");
  })

  return (
    <div>
      deleting...
    </div>
  )
}