import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddItem from "../Pages/Items/AddItems";
import EditItem from "../Pages/Items/EditItems";
import ManageITems from "../Pages/Items/ManageItems";

function ItemsRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ManageITems />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/add"
          element={
            <PrivateRoute>
              <AddItem />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditItem />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default ItemsRoutes;
