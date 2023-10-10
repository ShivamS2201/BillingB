import React from "react";
import { Route, Navigate, redirect, Routes } from "react-router-dom";
import { isAuthenticated } from "./authIndex";

export default function PrivateRoutes({component:Component,...props}) {
  if (isAuthenticated()){
    return <Component/>
  }
  return <Navigate to={{
                pathname: "/signin",
                state: { from: props.location },
              }} />
  // return (
  //   // <Routes>
  //   // <Route
  //   //   render={(props) =>
  //   //     isAuthenticated() ? (
  //   //       <Component {...children} />
  //   //     ) : (
  //   //       <Navigate
  //   //         to={{
  //   //           pathname: "/register",
  //   //           state: { from: props.location },
  //   //         }}
  //   //       />
  //   //     )
  //   //   }
  //   // />
  //   // </Routes>
  // );
}
