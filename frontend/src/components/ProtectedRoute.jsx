import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If there is no user, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists, render the children components (the page)
  return children;
};

export default ProtectedRoute;
