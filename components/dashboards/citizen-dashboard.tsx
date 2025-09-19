"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useAuth } from "@/components/auth-provider"
import { DashboardHeader } from "@/components/dashboard-header"
import { ReportHazardForm } from "@/components/report-hazard-form"

export function CitizenDashboard() {
  const { user } = useAuth()
  const [showReportForm, setShowReportForm] = useState(false)
  const [recentReports] = useState([
    {
      id: "1",
      type: "Tsunami Warning",
      location: "Marina Beach, Chennai",
      status: "Under Review",
      date: "2 hours ago",
      severity: "critical",
      reportId: "HR-001234",
    },
    {
      id: "2",
      type: "Coastal Flooding",
      location: "Kovalam Beach, Kerala",
      status: "Resolved",
      date: "1 day ago",
      severity: "high",
      reportId: "HR-001233",
    },
    {
      id: "3",
      type: "Storm Surge",
      location: "Visakhapatnam Port",
      status: "Investigating",
      date: "3 days ago",
      severity: "high",
      reportId: "HR-001232",
    },
  ])

  const [nearbyAlerts] = useState([
    {
      id: "1",
      type: "Hurricane Warning",
      location: "Marina Beach (2.3 km away)",
      severity: "critical",
      time: "1 hour ago",
    },
    {
      id: "2",
      type: "Rip Current Alert",
      location: "Elliot Beach (5.1 km away)",
      severity: "medium",
      time: "4 hours ago",
    },
  ])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground">Help keep our coasts safe by reporting natural disasters</p>
          </div>
          <Dialog open={showReportForm} onOpenChange={setShowReportForm}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <span className="text-lg">+</span>
                Report Disaster
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <ReportHazardForm onClose={() => setShowReportForm(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Reports</CardTitle>
              <span className="text-lg">📷</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <span className="text-lg text-warning">⚠️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">In your area</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Impact</CardTitle>
              <span className="text-lg text-primary">🌊</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">847</div>
              <p className="text-xs text-muted-foreground">Reports this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Recent Reports</CardTitle>
              <CardDescription>Track the status of your submissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{report.type}</h4>
                      <Badge
                        variant={
                          report.severity === "critical" || report.severity === "high" ? "destructive" : "secondary"
                        }
                      >
                        {report.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <span>📍</span>
                      {report.location}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>🕒</span>
                      {report.date} • ID: {report.reportId}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={report.status === "Resolved" ? "default" : "outline"}>{report.status}</Badge>
                    <Button size="sm" variant="ghost">
                      <span>👁️</span>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nearby Alerts</CardTitle>
              <CardDescription>Recent natural disasters reported in your area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {nearbyAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{alert.type}</h4>
                      <Badge
                        variant={
                          alert.severity === "critical" || alert.severity === "high" ? "destructive" : "secondary"
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <span>📍</span>
                      {alert.location}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>🕒</span>
                      {alert.time}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common reporting tasks and helpful resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 bg-transparent"
                onClick={() => setShowReportForm(true)}
              >
                <span className="text-xl">📷</span>
                <span className="text-xs">Report with Photo</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <span className="text-xl">📍</span>
                <span className="text-xs">Current Location</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <span className="text-xl">⚠️</span>
                <span className="text-xs">Emergency Report</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <span className="text-xl">🌊</span>
                <span className="text-xs">View Area Map</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
