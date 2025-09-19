"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  MessageSquare,
  AlertCircle,
  Download,
  Eye,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Hash,
  Globe,
  Activity,
} from "lucide-react"

interface SocialMediaPost {
  id: string
  platform: "twitter" | "facebook" | "instagram" | "reddit"
  content: string
  author: string
  timestamp: string
  engagement: {
    likes: number
    shares: number
    comments: number
  }
  sentiment: "positive" | "negative" | "neutral"
  location?: string
  hashtags: string[]
  relevanceScore: number
}

interface TrendData {
  keyword: string
  mentions: number
  sentiment: number
  change: number
  locations: string[]
}

const mockSocialPosts: SocialMediaPost[] = [
  {
    id: "1",
    platform: "twitter",
    content:
      "Massive oil spill spotted near Marina Beach! This is devastating for marine life. #OceanPollution #SaveOurSeas",
    author: "@EcoWarrior2024",
    timestamp: "2 hours ago",
    engagement: { likes: 245, shares: 89, comments: 34 },
    sentiment: "negative",
    location: "Chennai, India",
    hashtags: ["OceanPollution", "SaveOurSeas"],
    relevanceScore: 0.95,
  },
  {
    id: "2",
    platform: "facebook",
    content: "Great to see the cleanup efforts at Kovalam Beach today. Community coming together! 🌊",
    author: "Kerala Ocean Watch",
    timestamp: "4 hours ago",
    engagement: { likes: 156, shares: 23, comments: 18 },
    sentiment: "positive",
    location: "Kerala, India",
    hashtags: ["CleanupEfforts", "CommunityAction"],
    relevanceScore: 0.87,
  },
  {
    id: "3",
    platform: "instagram",
    content: "Plastic debris everywhere at the beach today. When will this stop? #PlasticPollution",
    author: "@beachphotographer",
    timestamp: "6 hours ago",
    engagement: { likes: 89, shares: 12, comments: 7 },
    sentiment: "negative",
    location: "Mumbai, India",
    hashtags: ["PlasticPollution"],
    relevanceScore: 0.78,
  },
]

const mockTrends: TrendData[] = [
  {
    keyword: "oil spill",
    mentions: 1247,
    sentiment: -0.73,
    change: 156,
    locations: ["Chennai", "Mumbai", "Kochi"],
  },
  {
    keyword: "plastic pollution",
    mentions: 892,
    sentiment: -0.65,
    change: 89,
    locations: ["Mumbai", "Goa", "Visakhapatnam"],
  },
  {
    keyword: "beach cleanup",
    mentions: 634,
    sentiment: 0.82,
    change: 45,
    locations: ["Kerala", "Tamil Nadu", "Karnataka"],
  },
  {
    keyword: "marine life",
    mentions: 456,
    sentiment: -0.34,
    change: -23,
    locations: ["Andaman", "Lakshadweep", "Gujarat"],
  },
]

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [sentimentFilter, setSentimentFilter] = useState("all")

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return "🐦"
      case "facebook":
        return "📘"
      case "instagram":
        return "📷"
      case "reddit":
        return "🤖"
      default:
        return "💬"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-success"
      case "negative":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="h-4 w-4 text-success" />
      case "negative":
        return <ThumbsDown className="h-4 w-4 text-destructive" />
      default:
        return <MessageSquare className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Social Media Analytics</h1>
          <p className="text-muted-foreground">Monitor public sentiment and trends about ocean hazards</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mentions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.2K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sentiment Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-0.34</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive">-8%</span> more negative
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trending Topics</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Active trending keywords</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alert Level</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">Medium</div>
            <p className="text-xs text-muted-foreground">Based on sentiment trends</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trending Topics</TabsTrigger>
          <TabsTrigger value="posts">Social Posts</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Mentions across social media platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🐦</span>
                      <span className="text-sm">Twitter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">7.2K</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>📘</span>
                      <span className="text-sm">Facebook</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">4.8K</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>📷</span>
                      <span className="text-sm">Instagram</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">2.1K</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🤖</span>
                      <span className="text-sm">Reddit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-1/4 h-full bg-primary rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">1.1K</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>User interaction with ocean hazard content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-success" />
                      <span className="text-sm">Likes</span>
                    </div>
                    <span className="text-sm font-medium">89.2K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Share2 className="h-4 w-4 text-primary" />
                      <span className="text-sm">Shares</span>
                    </div>
                    <span className="text-sm font-medium">23.4K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-secondary" />
                      <span className="text-sm">Comments</span>
                    </div>
                    <span className="text-sm font-medium">12.7K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Views</span>
                    </div>
                    <span className="text-sm font-medium">456K</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Sentiment</CardTitle>
                <CardDescription>Distribution of sentiment in mentions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-success" />
                      <span className="text-sm">Positive</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default" className="bg-success text-success-foreground">
                        23%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Neutral</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">45%</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ThumbsDown className="h-4 w-4 text-destructive" />
                      <span className="text-sm">Negative</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">32%</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment by Platform</CardTitle>
                <CardDescription>How sentiment varies across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🐦</span>
                      <span className="text-sm">Twitter</span>
                    </div>
                    <Badge variant="destructive">-0.45</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>📘</span>
                      <span className="text-sm">Facebook</span>
                    </div>
                    <Badge variant="secondary">-0.12</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>📷</span>
                      <span className="text-sm">Instagram</span>
                    </div>
                    <Badge variant="default" className="bg-success text-success-foreground">
                      +0.23
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>🤖</span>
                      <span className="text-sm">Reddit</span>
                    </div>
                    <Badge variant="destructive">-0.67</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment Trends</CardTitle>
                <CardDescription>How sentiment has changed over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Today</span>
                    <Badge variant="destructive">-0.34</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Yesterday</span>
                    <Badge variant="destructive">-0.28</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">3 days ago</span>
                    <Badge variant="secondary">-0.15</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">1 week ago</span>
                    <Badge variant="secondary">-0.08</Badge>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center gap-2 text-sm text-destructive">
                      <TrendingUp className="h-3 w-3" />
                      Sentiment declining by 15% this week
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trending Keywords</CardTitle>
              <CardDescription>Most mentioned keywords related to ocean hazards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-medium capitalize">{trend.keyword}</h4>
                        <Badge
                          variant={trend.sentiment > 0 ? "default" : "destructive"}
                          className={trend.sentiment > 0 ? "bg-success text-success-foreground" : ""}
                        >
                          {trend.sentiment > 0 ? "+" : ""}
                          {(trend.sentiment * 100).toFixed(0)}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {trend.mentions.toLocaleString()} mentions
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {trend.locations.join(", ")}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${trend.change > 0 ? "text-success" : "text-destructive"}`}>
                        {trend.change > 0 ? "+" : ""}
                        {trend.change}
                      </div>
                      <div className="text-xs text-muted-foreground">vs last week</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="reddit">Reddit</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sentiment</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {mockSocialPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getPlatformIcon(post.platform)}</span>
                      <div>
                        <div className="font-medium">{post.author}</div>
                        <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getSentimentIcon(post.sentiment)}
                      <Badge variant="outline">Score: {post.relevanceScore.toFixed(2)}</Badge>
                    </div>
                  </div>

                  <p className="text-sm mb-3">{post.content}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {post.engagement.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="h-3 w-3" />
                        {post.engagement.shares}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {post.engagement.comments}
                      </div>
                      {post.location && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {post.location}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {post.hashtags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Where ocean hazard discussions are happening</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Top Locations by Mentions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Chennai, Tamil Nadu</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-full h-full bg-destructive rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">2.1K</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mumbai, Maharashtra</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-warning rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">1.8K</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Kochi, Kerala</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-3/5 h-full bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">1.2K</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Visakhapatnam, AP</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="w-2/5 h-full bg-secondary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">0.9K</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Regional Sentiment</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">West Coast</span>
                      <Badge variant="destructive">-0.45</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">East Coast</span>
                      <Badge variant="destructive">-0.38</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Southern Coast</span>
                      <Badge variant="secondary">-0.12</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Island Territories</span>
                      <Badge variant="default" className="bg-success text-success-foreground">
                        +0.23
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
