import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import ManageQueries from "../Pages/Queries/ManageQueries";
import ViewQuery from "../Pages/Queries/ViewQuery";

function QueriesRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ManageQueries />
            </PrivateRoute>
          }
        />
        <Route
          path="view/:id/:status"
          element={
            <PrivateRoute>
              <ViewQuery />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default QueriesRoutes;
