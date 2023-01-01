import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddService from "../Pages/Service/AddService";
import EditService from "../Pages/Service/EditService";
import ManageServices from "../Pages/Service/ManageServices";
import ViewService from "../Pages/Service/ViewService";

function ServiceRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ManageServices />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddService />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditService />
            </PrivateRoute>
          }
        />
        <Route
          path="/view/:id"
          element={
            <PrivateRoute>
              <ViewService />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default ServiceRoutes;
