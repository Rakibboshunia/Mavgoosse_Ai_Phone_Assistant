import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/authentication/Login";
import Registration from "../pages/authentication/Registration";
import SendEmail from "../pages/authentication/SendEmail";
import Verifyotp from "../pages/authentication/Verifyotp";
import Changepassword from "../pages/authentication/Changepassword";

import CallLogs from "../pages/CallLogs";
import CallTransfer from "../pages/CallTransfer";
import PricingList from "../pages/Pricinglist";
import Appointment from "../pages/Appointment";
import Notifications from "../pages/Notifications";
import Setting from "../pages/Setting";
import AISettings from "../pages/AISettings";
import UserManagement from "../pages/UserManagement";

import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "STORE_MANAGER", "STAFF"]}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/call-logs",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "STORE_MANAGER", "STAFF"]}>
            <CallLogs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/call-transfer",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "STORE_MANAGER", "STAFF"]}>
            <CallTransfer />
          </ProtectedRoute>
        ),
      },
      {
        path: "/pricing-management",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "STORE_MANAGER"]}>
            <PricingList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/appointment",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "STORE_MANAGER", "STAFF"]}>
            <Appointment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/notifications",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <Notifications />
          </ProtectedRoute>
        ),
      },
      {
        path: "/setting",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "STORE_MANAGER", "STAFF"]}>
            <Setting />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ai-behavior-settings",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "STORE_MANAGER"]}>
            <AISettings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user-management",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <UserManagement />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/registration", element: <Registration /> },
  { path: "/send-email", element: <SendEmail /> },
  { path: "/verify-otp", element: <Verifyotp /> },
  { path: "/change-password", element: <Changepassword /> },
]);

export default router;
