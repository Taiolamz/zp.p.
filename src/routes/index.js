import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/dashboard";
import { Login } from "../pages/login";
import { NotFound } from "../pages/notFound";
import { SideBar } from "../atoms";
import { PrivateRoute } from "./privateRoute";
import { routesPath } from "../utils";
import { useAppDispatch, useAppSelector } from "../redux/redux-hooks";
function AppRoute() {
  const { LOGIN, DASHBOARD } = routesPath;
  const authState = useAppSelector((state) => state.auth);
  const { token, authenticated } = authState.data;

  return (
    <>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route
          path={DASHBOARD}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {authenticated && <SideBar />}
    </>
  );
}

export default AppRoute;
