import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddRider from "../Pages/technicians/AddRider";
import EditRider from "../Pages/technicians/EditRider";
import ManageRiders from "../Pages/technicians/ManageRiders";
import ViewRider from "../Pages/technicians/ViewRider";

function RiderRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ManageRiders />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/add"
          element={
            <PrivateRoute>
              <AddRider />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditRider />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/view/:id/:status"
          element={
            <PrivateRoute>
              <ViewRider />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default RiderRoutes;
