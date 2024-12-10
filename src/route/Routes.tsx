import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <App />,
        // loader: signupLoader
      },
    ],
  },
  // Add more routes as needed
]);
export default router;
