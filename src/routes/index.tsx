import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[{
        path: "about-us",
        Component: About,
    }
    ]
  },

  {
    path: "/admin",
    Component: DashboardLayout,
    children:[...generateRoutes(adminSidebarItems)]
  },

  {
    path: "/login",
    Component:LoginPage
  },
  {
    path: "/register",
    Component:RegisterPage
   }
])
