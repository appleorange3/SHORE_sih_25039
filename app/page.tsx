"use client"

import { useAuth } from "@/components/auth-provider"
import { LoginForm } from "@/components/login-form"
import { Dashboard } from "@/components/dashboard"

export default function HomePage() {
  const { user, isLoading } = useAuth()

  console.log("[v0] HomePage render - user:", user, "isLoading:", isLoading)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading SHORE...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    console.log("[v0] Showing login form")
    return <LoginForm />
  }

  console.log("[v0] Showing dashboard for user:", user.role)
  return <Dashboard />
}
