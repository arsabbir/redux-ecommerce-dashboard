import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUser } from "./features/auth/authApiSlice.js";
import {
  getAllBrands,
  getAllPermission,
  getAllRoles,
  getAllUsers,
} from "./features/user/userApiSlice.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(getLoggedInUser());
    }
  }, [dispatch]);

  // Load all permissions
  useEffect(() => {
    dispatch(getAllPermission());
    dispatch(getAllRoles());
    dispatch(getAllUsers());
    dispatch(getAllBrands());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
