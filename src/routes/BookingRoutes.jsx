import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import ManageBooking from "../Pages/Booking/ManageBookings";
import ViewBooking from "../Pages/Booking/ViewBooking";

function BookingRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ManageBooking />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/view/:id"
          element={
            <PrivateRoute>
              <ViewBooking />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default BookingRoutes;
