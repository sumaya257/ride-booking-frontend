import dashboard from "@/pages/riderPages/dashboard";
import rideHistory from "@/pages/riderPages/rideHistory";
import profile from "@/pages/profile";
import type { IsidebarItems } from "@/types";

export const riderSidebarItems:IsidebarItems[] =  [
    {
      title: "Rider Dashboard",
      items: [
        {
          title: "Dashboard",
          url: "/rider/dashboard",
          component:dashboard
        },
        {
          title: "Ride History",
          url: "/rider/rideHistory",
          component:rideHistory
        },
        {
          title: "Profile",
          url: "/rider/profile",
          component:profile
        },
      ],
    },
  ]