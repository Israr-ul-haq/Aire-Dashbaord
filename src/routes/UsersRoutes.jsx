import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import ManageUsers from "../Pages/Users/ManageUsers";
import ViewUser from "../Pages/Users/ViewUser";

function UserRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ManageUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="view/:id"
          element={
            <PrivateRoute>
              <ViewUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default UserRoutes;
