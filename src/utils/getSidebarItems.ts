import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { driverSidebarItems } from "@/routes/driverSidebarItems";
import { riderSidebarItems } from "@/routes/riderSidebar";
import type { TRole } from "@/types";

export const getSidebarItems = (role: TRole) => {
  switch (role) {
    case "admin":
      return [...adminSidebarItems];
    case "driver":
      return [...driverSidebarItems];
    case "rider":
      return [...riderSidebarItems];
    default:
      return [];
  }
};
