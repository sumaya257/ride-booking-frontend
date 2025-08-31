import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { driverSidebarItems } from "./driverSidebarItems";
import { riderSidebarItems } from "./riderSidebar";
import Home from "@/pages/Home";
import Features from "@/pages/Features";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import RideDetails from "@/pages/riderPages/rideDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[
      {
        path: '/',
        Component: Home,
    },  
    {
        path: "about",
        Component: About,
    },
    {
        path: "features",
        Component: Features,
    },
    {
        path: "contact",
        Component: Contact,
    },
    {
        path: "faq",
        Component: FAQ,
    },

    ]
  },

  {
    path: "/admin",
    Component: DashboardLayout,
    children:[...generateRoutes(adminSidebarItems)]
  },

  {
    path: "/driver",
    Component: DashboardLayout,
    children:[...generateRoutes(driverSidebarItems)]
  },

  {
    path: "/rider",
    Component: DashboardLayout,
    children:[...generateRoutes(riderSidebarItems),
      {
        path: "rides/:id",
        Component: RideDetails,
      },
    ]
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
