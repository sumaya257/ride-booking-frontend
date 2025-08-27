import Logo from "@/assets/icons/logo"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ModeToggle } from "./ModeToggoler"
import { Link } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { logout, selectCurrentUser } from "@/redux/features/auth/auth.slice"

import { adminSidebarItems } from "@/routes/adminSidebarItems"
import { driverSidebarItems } from "@/routes/driverSidebarItems"
import { riderSidebarItems } from "@/routes/riderSidebar"

// Navigation links
const navigationLinks = [
  { href: "/", label: "Home"},
  { href: "/about", label: "About Us" },
  { href: "/features", label: "Features" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" }
]

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Role-wise dashboard items
  const getDashboardItems = () => {
    if (!user) return [];
    if (user.role === "admin") return adminSidebarItems;
    if (user.role === "driver") return driverSidebarItems;
    if (user.role === "rider") return riderSidebarItems;
    return [];
  };

  const dashboardItems = getDashboardItems();

  return (
    <header className="border-b px-4 container mx-auto">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                {/* menu icon */}
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 12L20 12" />
                  <path d="M4 12H20" />
                  <path d="M4 12H20" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink asChild className="py-1.5">
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Logo + Desktop nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle/>

          {user ? (
            <>
              {/* Dashboard Dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="default">Dashboard</Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-48">
                  <ul className="flex flex-col gap-1">
                    {dashboardItems.flatMap(section =>
                      section.items.map(item => (
                        <li key={item.url}>
                          <Link
                            to={item.url}
                            className="block px-2 py-1 text-sm hover:bg-muted rounded"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </PopoverContent>
              </Popover>

              <Button
                onClick={handleLogout}
                className="text-sm"
                variant="outline"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button asChild className="text-sm">
              <Link to='/login'>Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
