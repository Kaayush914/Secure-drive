"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  User,
  Car,
  FileText,
  Activity,
  Brain,
  MessageSquare,
  Settings,
  HelpCircle,
  Map,
} from "lucide-react"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "My Vehicles",
    href: "/dashboard/vehicles",
    icon: Car,
  },
  {
    title: "Policy Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Driving Analysis",
    href: "/dashboard/driving-analysis",
    icon: Activity,
  },
  {
    title: "AI Analysis",
    href: "/dashboard/ai-analysis",
    icon: Brain,
  },
  {
    title: "Accident Map",
    href: "/dashboard/map",
    icon: Map,
  },
  {
    title: "Drowsiness Monitor",
    href: "/dashboard/drowsiness-monitor",
    icon: Activity,
  },
  {
    title: "Support Chat",
    href: "/dashboard/support",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help & FAQ",
    href: "/dashboard/help",
    icon: HelpCircle,
  },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40">
      <div className="flex flex-col gap-2 p-4">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === link.href ? "bg-muted text-primary font-medium" : "hover:bg-muted text-muted-foreground",
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.title}
          </Link>
        ))}
      </div>
    </aside>
  )
}

