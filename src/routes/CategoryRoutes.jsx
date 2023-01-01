import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddCategory from "../Pages/Category/AddCategory";
import EditCategory from "../Pages/Category/EditCategory";
import ManageCategories from "../Pages/Category/ManageCategories";


function CategoryRoutes({ children }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ManageCategories />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/add"
          element={
            <PrivateRoute>
              <AddCategory />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditCategory />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default CategoryRoutes;
