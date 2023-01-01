// import React from "react";
import { Navigate, Redirect, Route } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   //State

//   return JSON.parse(localStorage.getItem("AireUser")) ? (
//     children
//   ) : (
//     <Navigate to={{ pathname: "/account/login" }} />
//   );
// };

// export default PrivateRoute;
import React from "react";
import { withRouter } from "react-router-dom";
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
const PrivateRoute = ({ children }) => {
  if (JSON.parse(localStorage.getItem("AireUser")) === null) {
    return <Navigate to={{ pathname: "/account/login" }} />;
  }
  const user = JSON.parse(localStorage.getItem("AireUser"));
  if (parseJwt(user.token).exp * 1000 < Date.now()) {
    return <Navigate to={{ pathname: "/account/login" }} />;
  } else {
    return children;
  }
};
export default PrivateRoute;
