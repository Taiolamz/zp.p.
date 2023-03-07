import Cookies from "js-cookie";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { routesPath } from "../utils";

const { TOKEN } = routesPath;
function PrivateRoute({ children }) {
  // const token = localStorage.getItem("token");
  let token = Cookies.get(TOKEN);

  console.log(token, "user token");

  axios.defaults.headers.common["Authorization"] = token;

  if (!token) {
    // not logged in so redirect to login page with the return url
    return <Navigate to='/' />;
  }

  // authorized so return child components
  return children;
}

export { PrivateRoute };
