import { adminSidebarItems } from "@/routes/adminSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (role: TRole) => {
  switch (role) {
    case "admin":
      return [...adminSidebarItems];
    case "driver":
      return [];
    case "rider":
      return [];
    default:
      return [];
  }
};
