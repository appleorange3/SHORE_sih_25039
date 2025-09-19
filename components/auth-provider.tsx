"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export type UserRole = "citizen" | "official" | "analyst"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    console.log("[v0] AuthProvider initializing...")

    try {
      const savedUser = localStorage.getItem("shore-user")
      if (savedUser) {
        console.log("[v0] Found saved user:", savedUser)
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error("[v0] Error loading saved user:", error)
    }

    setIsLoading(false)
    console.log("[v0] AuthProvider initialized")
  }, [mounted])

  const login = async (email: string, password: string) => {
    console.log("[v0] Login attempt for:", email)
    setIsLoading(true)

    // Mock authentication - in real app, this would call your API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Determine role based on email domain for demo
    let role: UserRole = "citizen"
    if (email.includes("gov.") || email.includes("official")) {
      role = "official"
    } else if (email.includes("analyst") || email.includes("research")) {
      role = "analyst"
    }

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email
        .split("@")[0]
        .replace(/[._]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    }

    console.log("[v0] Login successful:", mockUser)
    setUser(mockUser)
    localStorage.setItem("shore-user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const logout = () => {
    console.log("[v0] Logout")
    setUser(null)
    localStorage.removeItem("shore-user")
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
