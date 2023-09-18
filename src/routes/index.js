import { Routes, Route } from 'react-router-dom';
import { Dashboard, TransactionInformation } from '../pages/dashboard';
import { Login } from '../pages/login';
import { Kyc, KycCustomer } from '../pages/kyc';
import { Support } from '../pages/support';
import { Users, RoleDetails, UserDetails, CreateRole } from '../pages/users';
import { Settlements, Reconciliation, ReconcilationUserDetails } from '../pages/settlements';
import {
  NewNotificationPage,
  NotificationUpdate,
  NewAppNotification,
  NewArticles,
  NewFaq,
  Settings,
  UpdateArticle,
  EditFaq,
} from '../pages/settings';
import { NotFound } from '../pages/notFound';
import { PrivateRoute } from './privateRoute';
import { routesPath } from '../utils';
import { Transactions } from '../pages/transactions';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
    NEWAPPNOTIFICATION,
    APPNOTIFICATIONUPDATE,
    EMAILNOTIFICATION,
    EMAILNOTIFICATIONUPDATE,
    NEWARTICLE,
    ARTICLEUPDATE,
    NEWFAQ,
    FAQUPDATE,
    USERROLES,
    CREATEUSERROLES,
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
          path={`${USERROLES}:id`}
          element={
            <PrivateRoute>
              <RoleDetails />
            </PrivateRoute>
          }
        />
        <Route
          path={CREATEUSERROLES}
          element={
            <PrivateRoute>
              <CreateRole />
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
          path={NEWAPPNOTIFICATION}
          element={
            <PrivateRoute>
              <NewNotificationPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${APPNOTIFICATIONUPDATE}:id`}
          element={
            <PrivateRoute>
              <NotificationUpdate />
            </PrivateRoute>
          }
        />
        <Route
          path={EMAILNOTIFICATION}
          element={
            <PrivateRoute>
              <NewNotificationPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${EMAILNOTIFICATIONUPDATE}:id`}
          element={
            <PrivateRoute>
              <NotificationUpdate />
            </PrivateRoute>
          }
        />
        <Route
          path={NEWARTICLE}
          element={
            <PrivateRoute>
              <NewArticles />
            </PrivateRoute>
          }
        />

        <Route
          path={`${ARTICLEUPDATE}:id`}
          element={
            <PrivateRoute>
              <UpdateArticle />
            </PrivateRoute>
          }
        />
        <Route
          path={NEWFAQ}
          element={
            <PrivateRoute>
              <NewFaq />
            </PrivateRoute>
          }
        />
        <Route
          path={`${FAQUPDATE}:id`}
          element={
            <PrivateRoute>
              <EditFaq />
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
        <Route
          path="/test"
          element={
            <>
              <div className="tw-w-1/2 tw-mx-auto">
                {Array.from({ length: 3 }, (_, idx) => (
                  <Skeleton key={idx} count={2} className="tw-w-full tw-bg-red-400" />
                ))}
              </div>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default AppRoute;
