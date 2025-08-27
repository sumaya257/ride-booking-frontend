import dashboard from "@/pages/driverPages/dashboard";
import rideHistory from "@/pages/driverPages/rideHistory";
import profile from "@/pages/profile";
import type { IsidebarItems } from "@/types";

export const driverSidebarItems:IsidebarItems[] =  [
    {
      title: "Driver Dashboard",
      items: [
        {
          title: "Dashboard",
          url: "/driver/dashboard",
          component:dashboard
        },
        {
          title: "Ride History",
          url: "/driver/rideHistory",
          component:rideHistory
        },
        {
          title: "Profile",
          url: "/driver/profile",
          component:profile
        },
      ],
    },
  ]