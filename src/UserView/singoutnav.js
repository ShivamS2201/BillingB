import SignOut from "../auth/authIndex";
import './css/userboard.css'
import { useNavigate } from "react-router-dom";

export function SignoutNav(){
    const navi = useNavigate();
    return(
        <div className="Signnout"><button onClick={(event)=>{
            event.preventDefault();
             SignOut(()=>{
                navi('/signin')
             });
        }}><i className="bi bi-lock"></i> Sign out</button></div>
    )
}

