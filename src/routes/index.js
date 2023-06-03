import { Routes, Route } from 'react-router-dom';
import { Dashboard, TransactionInformation } from '../pages/dashboard';
import { Login } from '../pages/login';
import { Kyc, KycCustomer } from '../pages/kyc';
import { Support } from '../pages/support';
import { Users } from '../pages/users';
import { Settlements, Reconciliation, ReconcilationUserDetails } from '../pages/settlements';
import { Settings } from '../pages/settings';
import { NotFound } from '../pages/notFound';
import { PrivateRoute } from './privateRoute';
import { routesPath } from '../utils';
import UserDetails from '../pages/users/userDetails';
import { Transactions } from '../pages/transactions';

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
    KYCDOC,
    USERDETAILS,
    TRANSACTIONS,
    TRANSACTIONINFORMATION,
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
          path={TRANSACTIONINFORMATION}
          element={
            <PrivateRoute>
              <TransactionInformation />
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
          path={`${KYCDOC}:id`}
          element={
            <PrivateRoute>
              <KycCustomer />
            </PrivateRoute>
          }
        />
        <Route
          path={`${USERDETAILS}:id`}
          element={
            <PrivateRoute>
              <UserDetails />
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
        <Route
          path={TRANSACTIONS}
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoute;
