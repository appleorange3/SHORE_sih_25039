"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { LoginForm } from "@/components/login-form"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

import InteractiveMap from "@/components/interactive-map"

export default function MapPage() {
  const { user, isLoading } = useAuth()
  const [severityFilter, setSeverityFilter] = useState("all")
  const [timeRange, setTimeRange] = useState([24]) // hours

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top header */}
      <DashboardHeader />

      {/* Main dashboard layout */}
      <main className="container mx-auto flex-1 grid grid-cols-12 gap-6 p-6">
        
        {/* Left side: Map */}
        <div className="col-span-8">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Interactive Hazard Map</CardTitle>
            </CardHeader>
            <CardContent className="h-[650px] relative">
              <InteractiveMap severityFilter={severityFilter} timeRange={timeRange} />
            </CardContent>
          </Card>
        </div>

        {/* Right side: Controls + Analytics */}
        <div className="col-span-4 flex flex-col gap-6">
          
          {/* Filters Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Search Location</label>
                <Input placeholder="Type a city, region, or coordinates..." />
              </div>

              <div>
                <label className="block text-sm mb-2">Severity</label>
                <Tabs value={severityFilter} onValueChange={setSeverityFilter}>
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="low">Low</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="high">High</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div>
                <label className="block text-sm mb-2">Time Range (hours)</label>
                <Slider
                  value={timeRange}
                  onValueChange={setTimeRange}
                  min={1}
                  max={168}
                  step={1}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Showing hazards from last {timeRange[0]}h
                </p>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>

          {/* Analytics Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Live Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Active Reports</span>
                <Badge>42</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Critical Alerts</span>
                <Badge variant="destructive">5</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Regions Affected</span>
                <Badge>12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Average Response Time</span>
                <Badge variant="secondary">1.8h</Badge>
              </div>
            </CardContent>
          </Card>

          {/* User Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">Report New Hazard</Button>
              <Button variant="outline" className="w-full">Download Report</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
