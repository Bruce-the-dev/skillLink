import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import UpdateProfile from "../pages/UpdateProfile";
import CreateCourse from "../pages/Instructor/CreateCourse";
import CategoryPage from "../pages/Instructor/CategoryPage";
import LearnerDashboard from "../pages/Student/LearnerDashboard";
import CourseBrowsingPage from "../pages/Student/CourseBrowsing";
import CourseDetailPage from "../pages/Student/CourseDetail";
import AssessmentSubmissionPage from "../pages/Student/Assessment";
import AchievementsPage from "../pages/Student/Achievements";
import InboxPage from "../pages/Student/Inbox";
import MessageThreadPage from "../pages/Student/MessageThread";

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
  {
    path: "/student",
    children: [
      {
        path: "dashboard",
        element: <LearnerDashboard />,
      },
      {
        path: "Browsing",
        element: <CourseBrowsingPage />,
      },
      {
        path: "course",
        element: <CourseDetailPage />,
      },
      {
        path: "assessment",
        element: <AssessmentSubmissionPage />,
      },
      {
        path: "achievement",
        element: <AchievementsPage />,
      },
      { path: "Inbox", element: <InboxPage /> },
      {
        path: "message",
        element: <MessageThreadPage />,
      },
    ],
  },

  // Add more routes as needed
]);
export default router;
