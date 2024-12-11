import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import UpdateProfile from "../pages/UpdateProfile";
import path from "path";
import CreateCourse from "../pages/Instructor/CreateCourse";
import CategoryPage from "../pages/Instructor/CategoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
        // loader: signupLoader
      },
      {
        path: "profile/:userId",
        element: <UpdateProfile />,
      },
    ],
  },
  {
    path: "/Course",
    children: [
      {
        path: "add",
        element: <CreateCourse />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
    ],
  },

  // Add more routes as needed
]);
export default router;
