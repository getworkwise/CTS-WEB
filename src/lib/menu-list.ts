import {
  LayoutDashboard,
  Search,
  FileQuestion,
  FileCheck,
  Users,
  Settings,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Main",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname === "/dashboard",
          icon: LayoutDashboard,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Lost and Found",
      menus: [
        {
          href: "/lost-items",
          label: "Lost Items",
          active: pathname.includes("/lost-items"),
          icon: FileQuestion,
          submenus: []
        },
        {
          href: "/found-items",
          label: "Found Items",
          active: pathname.includes("/found-items"),
          icon: FileCheck,
          submenus: []
        },
        {
          href: "/search",
          label: "Search",
          active: pathname.includes("/search"),
          icon: Search,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Administration",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/settings",
          label: "Settings",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}
