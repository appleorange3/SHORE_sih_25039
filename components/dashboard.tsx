"use client"

import { useAuth } from "@/components/auth-provider"
import { CitizenDashboard } from "@/components/dashboards/citizen-dashboard"
import { OfficialDashboard } from "@/components/dashboards/official-dashboard"
import { AnalystDashboard } from "@/components/dashboards/analyst-dashboard"

export function Dashboard() {
  const { user } = useAuth()

  if (!user) return null

  switch (user.role) {
    case "citizen":
      return <CitizenDashboard />
    case "official":
      return <OfficialDashboard />
    case "analyst":
      return <AnalystDashboard />
    default:
      return <CitizenDashboard />
  }
}
