"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { LanguageSelector } from "@/components/language-selector"
import Link from "next/link"

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()

  const getRoleColor = (role: string) => {
    switch (role) {
      case "official":
        return "bg-destructive text-destructive-foreground"
      case "analyst":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-primary text-primary-foreground"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "official":
        return t("roles.official")
      case "analyst":
        return t("roles.analyst")
      default:
        return t("roles.citizen")
    }
  }

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl text-primary">🌊</span>
              <h1 className="text-xl font-bold">{t("appInfo.appName")}</h1>
            </Link>
            <Badge className={getRoleColor(user?.role || "citizen")}>{getRoleLabel(user?.role || "citizen")}</Badge>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <span>🏠</span>
                {t("navigation.dashboard")}
              </Button>
            </Link>
            <Link href="/map">
              <Button variant="ghost" size="sm" className="gap-2">
                <span>🗺️</span>
                {t("navigation.mapView")}
              </Button>
            </Link>
            {(user?.role === "analyst" || user?.role === "official") && (
              <Link href="/analytics">
                <Button variant="ghost" size="sm" className="gap-2">
                  <span>📊</span>
                  {t("navigation.analytics")}
                </Button>
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span className="mr-2">👤</span>
                  <span>{t("navigation.profile")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="mr-2">⚙️</span>
                  <span>{t("navigation.settings")}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <span className="mr-2">🚪</span>
                  <span>{t("auth.signOut")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
