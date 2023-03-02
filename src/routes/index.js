import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/dashboard";
import { Login } from "../pages/login";
import { NotFound } from "../pages/notFound";
import { PrivateRoute } from "./privateRoute";
import { routesPath } from "../utils";

function AppRoute() {
  const { login, dashboard } = routesPath;
  return (
    <>
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
    </>
  );
}

export default AppRoute;
