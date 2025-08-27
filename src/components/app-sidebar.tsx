import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/icons/logo";
import { Link } from "react-router";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/auth.slice";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useSelector(selectCurrentUser);
  console.log(user?.role);
  const data = {
    navMain: getSidebarItems(user?.role ?? "rider"),
  };

  return (
    <Sidebar
      {...props}
      className="" // Increase sidebar width (default might be 64)
    >
      <SidebarHeader>
        <div className="flex justify-center pt-4">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="flex justify-center mb-2">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url} className="flex justify-center">{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
