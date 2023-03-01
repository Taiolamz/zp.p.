import axios from "axios";
import { Navigate } from "react-router-dom";
export { PrivateRoute };

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  axios.defaults.headers.common["Authorization"] = token;

  if (!token) {
    // not logged in so redirect to login page with the return url
    return <Navigate to='/' />;
  }

  // authorized so return child components
  return children;
}
