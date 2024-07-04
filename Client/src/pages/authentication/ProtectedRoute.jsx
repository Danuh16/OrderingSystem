import React from "react";
import { Navigate } from "react-router-dom";

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user; //&& user.token; // Return true if user is found and has a token
};

const ProtectedRoute = ({ element: Component, ...rest }) => {
  return isAuthenticated() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
