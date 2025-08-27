import rideOversight from "@/pages/adminpages/rideOversight";
import userManagement from "@/pages/adminpages/userManagement";
import profile from "@/pages/profile";
import type { IsidebarItems } from "@/types";

export const adminSidebarItems:IsidebarItems[] =  [
    {
      title: "Admin Dashboard",
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          component:userManagement
        },
        {
          title: "User Management",
          url: "/admin/userManagement",
          component:userManagement
        },
        {
          title: "Ride oversight",
          url: "/admin/rideOversight",
          component:rideOversight
        },
        {
          title: "Profile",
          url: "/admin/profile",
          component:profile
        },
      ],
    },
  ]