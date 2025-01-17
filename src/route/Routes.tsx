import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword";
import InboxPage from "../pages/Inbox";
import AssessmentCreation from "../pages/Instructor/AssessmentCreation";
import AssessmentGradingPage from "../pages/Instructor/AssessmentGrade";
import CategoryPage from "../pages/Instructor/CategoryPage";
import CourseManagementPage from "../pages/Instructor/CourseMgt";
import CreateCourse from "../pages/Instructor/CreateCourse";
import InstructorDashboard from "../pages/Instructor/InstructorDashboard";
import Login from "../pages/Login";
import MessageThreadPage from "../pages/MessageThread";
import Signup from "../pages/Signup";
import AchievementsPage from "../pages/Student/Achievements";
import AssessmentSubmissionPage from "../pages/Student/Assessment";
import CourseBrowsingPage from "../pages/Student/CourseBrowsing";
import CourseDetailPage from "../pages/Student/CourseDetail";
import LearnerDashboard from "../pages/Student/LearnerDashboard";
import UpdateProfile from "../pages/UpdateProfile";
import Dashboard from "../Universal/Dashboard";
import AdminDashboard from "../Universal/AdminDashboard";

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
        path: "profile/",
        element: <UpdateProfile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "forgot-password", // Add Forgot Password route
        element: <ForgotPassword />,
      },
      {
        path: "Admindashboard",
        element: <AdminDashboard />,
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
        path: "",
        element: <LearnerDashboard />,
      },
      {
        path: "Browsing",
        element: <CourseBrowsingPage />,
      },
      {
        path: "course/:courseId",
        element: <CourseDetailPage />,
      },
      {
        path: "assessment/:courseId",
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
  {
    path: "/instructor",
    children: [
      {
        path: "",
        element: <InstructorDashboard />,
      },
      {
        path: "ViewCourses",
        element: <CourseManagementPage />,
      },

      {
        path: "CreateAssessment/:courseId",
        element: <AssessmentCreation />,
      },
      {
        path: "Grading",
        element: <AssessmentGradingPage />,
      },
    ],
  },

  // Add more routes as needed
]);
export default router;
