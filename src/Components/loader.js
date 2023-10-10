import React from "react";
import './css/loader.css';

const Loader =()=>{
    return(
        <>
        <div className="loaderWrapper">
        <img
        className="loader1"
                alt="nothong"
                src={require("../assets/images/loader1.gif")}
                height="130"
                width="112"
              />
              <img
              className="loader2"
                alt="nothong"
                src={require("../assets/images/loader2.gif")}
                height="40"
                width="60"
              /> 
              </div>
        </>
        
    )
}

export default Loader;