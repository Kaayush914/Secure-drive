"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  FileText,
  Activity,
  Brain,
  Settings,
  HelpCircle,
  Car,
  AlertTriangle,
  BarChart3,
} from "lucide-react"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Claims",
    href: "/admin/claims",
    icon: FileText,
  },
  {
    title: "Vehicles",
    href: "/admin/vehicles",
    icon: Car,
  },
  {
    title: "Driving Analysis",
    href: "/admin/driving-analysis",
    icon: Activity,
  },
  {
    title: "Drowsiness Reports",
    href: "/admin/drowsiness-reports",
    icon: AlertTriangle,
  },
  {
    title: "AI Analytics",
    href: "/admin/ai-analytics",
    icon: Brain,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/admin/help",
    icon: HelpCircle,
  },
]

export default function AdminSidebar() {
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

