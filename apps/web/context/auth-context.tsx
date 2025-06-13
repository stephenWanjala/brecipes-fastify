"use client"

import React, { useEffect } from "react"
import { createContext, useState, useContext, type ReactNode } from "react"

type User = {
  id: string
  email: string
  apiKey: string
  token?: string
  role: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
  regenerateApiKey: () => Promise<string>
  fetchUsageStats: () => Promise<any>
  loading: boolean
}



const baseUrl = "https://brecipes-fastify.onrender.com"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  async function login(email: string, password: string): Promise<void> {
    setLoading(true)
    try {
      // Ensure baseUrl is not undefined
      if (!baseUrl) {
        throw new Error("Base URL is not defined.")
      }
      const response = await fetch(`${baseUrl}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        // Attempt to parse error message from response
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Login failed");
      }

      const loggedInUser = await response.json()
      console.log("loggedInUser", loggedInUser)
      setUser(loggedInUser)
      localStorage.setItem("user", JSON.stringify(loggedInUser))
      // Store the JWT token if provided
      if (loggedInUser.token) {
        localStorage.setItem("token", loggedInUser.token)
      }
    } catch (error) {
      console.error("Login failed:", error)
      // Re-throw to be caught by the component using useAuth
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function register(email: string, password: string): Promise<void> {
    setLoading(true)
    try {
      if (!baseUrl||baseUrl.length === 0) {
        throw new Error("Base URL is not defined.")
      }
      const response = await fetch(`${baseUrl}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Registration failed");
      }

      const newUser = await response.json()
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      // Store the JWT token if provided
      if (newUser.token) {
        localStorage.setItem("token", newUser.token)
      }
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  async function regenerateApiKey(): Promise<string> {
    setLoading(true)
    try {
      if (!baseUrl) {
        throw new Error("Base URL is not defined.")
      }
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No token found. Please log in.")
      }

      const response = await fetch(`${baseUrl}/api/apikey/regenerate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "API key regeneration failed");
      }

      const data = await response.json()
      const newApiKey = data.apiKey

      if (user) {
        const updatedUser = { ...user, apiKey: newApiKey }
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }

      return newApiKey
    } catch (error) {
      console.error("API key regeneration failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  async function fetchUsageStats() {
    try {
      if (!baseUrl) {
        throw new Error("Base URL is not defined.")
      }
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No token found. Please log in.")
      }

      const response = await fetch(`${baseUrl}/api/usage/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch usage stats");
      }

      return await response.json()
    } catch (error) {
      console.error("Failed to fetch usage stats:", error)
      throw error
    }
  }

  return (
      <AuthContext.Provider
          value={{
            user,
            login,
            register,
            logout,
            regenerateApiKey,
            fetchUsageStats,
            loading,
          }}
      >
        {children}
      </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}