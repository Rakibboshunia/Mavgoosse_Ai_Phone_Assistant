import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Registration from "../pages/authentication/Registration";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/authentication/Login";
import CallLogs from "../pages/CallLogs";
import CallTransfer from "../pages/CallTransfer";
import PricingList from "../pages/Pricinglist";
import Appointment from "../pages/Appointment";
import Notifications from "../pages/Notifications";
import Setting from "../pages/Setting";
import SendEmail from "../pages/authentication/SendEmail";
import Verifyotp from "../pages/authentication/Verifyotp";
import Changepassword from "../pages/authentication/Changepassword";
import AISettings from "../pages/AISettings";
import APISettings from "../pages/APISettings";
import UserManagement from "../pages/UserManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/call-logs",
        element: <CallLogs />,
      },
      {
        path: "/call-transfer",
        element: <CallTransfer />,
      },
      {
        path: "/pricing-list",
        element: <PricingList />,
      },
      {
        path: "/pricing-management",
        element: <PricingList />,
      },
      {
        path: "/appointment",
        element: <Appointment />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
      {
        path: "/ai-behavior-settings",
        element: <AISettings />,
      },
      {
        path: "/api-settings",
        element: <APISettings />,
      },
      {
        path: "/user-management",
        element: <UserManagement />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/send-email",
    element: <SendEmail />,
  },
  {
    path: "/verify-otp",
    element: <Verifyotp />,
  },
  {
    path: "/change-password",
    element: <Changepassword />,
  },
]);

export default router;
