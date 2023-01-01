import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import ManagePayment from "../Pages/Payments/MangePayments";

function PaymentRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ManagePayment />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default PaymentRoutes;
