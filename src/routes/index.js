import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/dashboard";
import { Login } from "../pages/login";
import { Kyc } from "../pages/kyc";
import { Support } from "../pages/support";
import { Users } from "../pages/users";
import {
  Settlements,
  Reconciliation,
  ReconcilationUserDetails,
} from "../pages/settlements";
import { Settings } from "../pages/settings";
import { NotFound } from "../pages/notFound";
import { PrivateRoute } from "./privateRoute";
import { routesPath } from "../utils";
import { useAppSelector } from "../redux/redux-hooks";
function AppRoute() {
  const {
    LOGIN,
    DASHBOARD,
    SUPPORT,
    KYC,
    SETTLEMENTS,
    RECONCILIATION,
    RECONCILIATIONUSERDETAILS,
    USERS,
    SETTINGS,
  } = routesPath;
  // const authState = useAppSelector((state) => state.auth);

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
        <Route
          path={KYC}
          element={
            <PrivateRoute>
              <Kyc />
            </PrivateRoute>
          }
        />
        <Route
          path={SUPPORT}
          element={
            <PrivateRoute>
              <Support />
            </PrivateRoute>
          }
        />

        <Route
          path={SETTLEMENTS}
          element={
            <PrivateRoute>
              <Settlements />
            </PrivateRoute>
          }
        />
        <Route
          path={RECONCILIATION}
          element={
            <PrivateRoute>
              <Reconciliation />
            </PrivateRoute>
          }
        />
        <Route
          path={`${RECONCILIATIONUSERDETAILS}:id`}
          element={
            <PrivateRoute>
              <ReconcilationUserDetails />
            </PrivateRoute>
          }
        />
        <Route
          path={USERS}
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path={SETTINGS}
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoute;
