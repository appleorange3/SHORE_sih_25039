"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Waves, Shield, BarChart3 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { LanguageSelector } from "@/components/language-selector"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError(t("auth.fillAllFields"))
      return
    }

    try {
      await login(email, password)
    } catch (err) {
      setError(t("auth.invalidCredentials"))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>

        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Waves className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-balance">{t("appInfo.appName")}</h1>
          </div>
          <p className="text-sm text-muted-foreground text-balance">{t("appInfo.fullName")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("auth.signIn")}</CardTitle>
            <CardDescription>{t("auth.signInDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("common.loading") : t("auth.signIn")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="flex justify-center">
              <Waves className="h-6 w-6 text-primary" />
            </div>
            <div className="text-xs text-muted-foreground">
              <div className="font-medium">{t("roles.citizen")}</div>
              <div>Report hazards</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="text-xs text-muted-foreground">
              <div className="font-medium">{t("roles.official")}</div>
              <div>Monitor & respond</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div className="text-xs text-muted-foreground">
              <div className="font-medium">{t("roles.analyst")}</div>
              <div>Analyze trends</div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>Demo accounts:</p>
          <p>citizen@example.com | official@gov.example | analyst@research.com</p>
          <p>Password: any</p>
        </div>
      </div>
    </div>
  )
}
