"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { DashboardHeader } from "@/components/dashboard-header"

export function OfficialDashboard() {
  const { user } = useAuth()
  const [activeIncidents] = useState([
    {
      id: "1",
      type: "Tsunami Warning",
      location: "Marina Beach, Chennai",
      severity: "critical",
      reports: 45,
      time: "2 hours ago",
      status: "investigating",
    },
    {
      id: "2",
      type: "Coastal Flooding",
      location: "Kovalam Beach, Kerala",
      severity: "high",
      reports: 28,
      time: "4 hours ago",
      status: "pending",
    },
    {
      id: "3",
      type: "Hurricane Approaching",
      location: "Visakhapatnam Port",
      severity: "critical",
      reports: 67,
      time: "6 hours ago",
      status: "responding",
    },
  ])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Official Dashboard</h1>
            <p className="text-muted-foreground">Monitor and respond to ocean natural disasters</p>
          </div>
          <Button size="lg" variant="destructive" className="gap-2">
            <span className="text-lg">⚠️</span>
            Emergency Response
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
              <span className="text-lg text-destructive">⚠️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">+3 in last hour</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citizen Reports</CardTitle>
              <span className="text-lg text-primary">👥</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Teams</CardTitle>
              <span className="text-lg text-success">✅</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Active deployments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trend Alert</CardTitle>
              <span className="text-lg text-warning">📈</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">↑ 24%</div>
              <p className="text-xs text-muted-foreground">Reports vs last week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Priority Incidents</CardTitle>
              <CardDescription>Natural disasters requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeIncidents.map((incident) => (
                <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{incident.type}</h4>
                      <Badge
                        variant={
                          incident.severity === "critical" || incident.severity === "high" ? "destructive" : "secondary"
                        }
                      >
                        {incident.severity}
                      </Badge>
                      <Badge variant="outline">{incident.reports} reports</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <span>📍</span>
                      {incident.location}
                    </div>
                    <p className="text-xs text-muted-foreground">{incident.time}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <span>👁️</span>
                    </Button>
                    <Button size="sm">Respond</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Overview</CardTitle>
              <CardDescription>Natural disaster distribution by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tamil Nadu Coast</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-destructive rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">12</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Kerala Coast</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-warning rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Andhra Pradesh Coast</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-warning rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">10</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">West Bengal Coast</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-1/4 h-full bg-success rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">4</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
