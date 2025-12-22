import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Registration from "../pages/authentication/registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <>Dashboard</>,
      },
      {
        path: "/call-logs",
        element: <>Call Logs</>,
      },
      {
        path: "/call-transfer",
        element: <>Call Transfer</>,
      },
      {
        path: "/pricing-list",
        element: <>Pricing List</>,
      },
      {
        path: "/appointment",
        element: <>Appointment</>,
      },
      {
        path: "/notifications",
        element: <>Notifications</>,
      },
      {
        path: "/setting",
        element: <>Setting</>,
      },
    ],
  },
  {
    path: "/login",
    element: <login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
]);

export default router;
