import {
  Route,
  Routes as Switch,
  HashRouter as Router,
} from "react-router-dom";
import DashBoard from "../Pages/dashboard/DashBoard";

import ForgotPasswword from "../Pages/forgotPassword/ForgotPasswword";
import ManageITems from "../Pages/Items/ManageItems";

import Login from "../Pages/login/Login";
import ManagePayment from "../Pages/Payments/MangePayments";
import ManageQueries from "../Pages/Queries/ManageQueries";
import BookingRoutes from "../routes/BookingRoutes";
import CategoryRoutes from "../routes/CategoryRoutes";
import ItemsRoutes from "../routes/ItemsRoutes";
import PaymentRoutes from "../routes/PaymentsRoutes";
import QueriesRoutes from "../routes/QueriesRoutes";
import RiderRoutes from "../routes/RidersRoutes";
import ServiceRoutes from "../routes/ServiceRoutes";
import UserRoutes from "../routes/UsersRoutes";
import WebLayout from "../webLayouts/WebLayouts";
import PrivateRoute from "./PrivateRoute";

function Routes() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/account/login" element={<Login />} />
          <Route
            exact
            path="/account/forgotpassword"
            element={<ForgotPasswword />}
          />
          <Route path="/" element={<WebLayout />}>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <DashBoard />
                </PrivateRoute>
              }
            />
            <Route path="users/*" element={<UserRoutes />} />
            <Route path="riders/*" element={<RiderRoutes />} />
            <Route path="services/*" element={<ServiceRoutes />} />
            <Route path="bookings/*" element={<BookingRoutes />} />
            <Route path="payments/*" element={<PaymentRoutes />} />
            <Route path="queries/*" element={<QueriesRoutes />} />
            <Route path="items/*" element={<ItemsRoutes />} />
            <Route path="category/*" element={<CategoryRoutes />} />
          </Route>
          {/* <Route path="/" element={<WebLayout />}></Route> */}
        </Switch>
      </>
    </Router>
  );
}

export default Routes;
