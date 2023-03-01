import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/dashboard";
import { Login } from "../pages/login";
import { NotFound } from "../pages/notFound";
import { PrivateRoute } from "./privateRoute";
import { routesPath } from "../utils";

function AppRoute() {
  const { login, dashboard } = routesPath;
  return (
    <div>
      <Routes>
        <Route path={login} element={<Login />} />
        <Route
          path={dashboard}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default AppRoute;
