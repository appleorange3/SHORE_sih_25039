"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { DashboardHeader } from "@/components/dashboard-header"
import Link from "next/link"

export function AnalystDashboard() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Analyze trends and patterns in ocean hazard data</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <span>🔍</span>
              Filter
            </Button>
            <Link href="/analytics">
              <Button size="sm" className="gap-2">
                <span>👁️</span>
                Full Analytics
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <span className="text-lg text-primary">📊</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Social Mentions</CardTitle>
              <span className="text-lg text-secondary">💬</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15.2K</div>
              <p className="text-xs text-muted-foreground">Across all platforms</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trend Score</CardTitle>
              <span className="text-lg text-success">📈</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.3</div>
              <p className="text-xs text-muted-foreground">Prediction accuracy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
              <span className="text-lg text-warning">⚠️</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Medium</div>
              <p className="text-xs text-muted-foreground">Current assessment</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Hazard Type Distribution</CardTitle>
              <CardDescription>Most reported hazard categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span className="text-sm">Oil Spills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-4/5 h-full bg-destructive rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">34%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <span className="text-sm">Plastic Debris</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-3/5 h-full bg-warning rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm">Chemical Discharge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-2/5 h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">22%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span className="text-sm">Other</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="w-1/5 h-full bg-secondary rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">16%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media Sentiment</CardTitle>
              <CardDescription>Public sentiment analysis from social platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Positive</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-success text-success-foreground">
                      23%
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Neutral</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">45%</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Negative</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive">32%</Badge>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Trending Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">#OceanCleanup</Badge>
                  <Badge variant="outline">#MarinePollution</Badge>
                  <Badge variant="outline">#CoastalAlert</Badge>
                  <Badge variant="outline">#SaveOurSeas</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Predictive Insights</CardTitle>
            <CardDescription>AI-powered predictions and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-warning">⚠️</span>
                  <h4 className="font-medium">High Risk Zone</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Chennai coast shows 73% probability of oil spill incidents in next 48 hours
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary">📈</span>
                  <h4 className="font-medium">Trend Alert</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Plastic debris reports increasing by 15% weekly in Kerala region
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-secondary">💬</span>
                  <h4 className="font-medium">Social Signal</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Unusual spike in marine pollution discussions on Twitter (Mumbai area)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
