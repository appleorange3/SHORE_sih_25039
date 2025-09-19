"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth-provider"

interface HazardReport {
  type: string
  severity: "low" | "medium" | "high" | "critical"
  description: string
  location: {
    latitude: number
    longitude: number
    address: string
  }
  media: File[]
  contactInfo: {
    name: string
    phone: string
    email: string
  }
}

export function ReportHazardForm({ onClose }: { onClose?: () => void }) {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [locationLoading, setLocationLoading] = useState(false)

  const [report, setReport] = useState<HazardReport>({
    type: "",
    severity: "medium",
    description: "",
    location: {
      latitude: 0,
      longitude: 0,
      address: "",
    },
    media: [],
    contactInfo: {
      name: user?.name || "",
      phone: "",
      email: user?.email || "",
    },
  })

  const hazardTypes = [
    "Tsunami Warning",
    "Coastal Flooding",
    "Storm Surge",
    "Hurricane/Typhoon",
    "Rip Current",
    "King Tide",
    "Coastal Erosion",
    "Red Tide/Algal Bloom",
    "Other Natural Ocean Disaster",
  ]

  const getCurrentLocation = () => {
    setLocationLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords

          // Mock reverse geocoding - in real app, use Google Maps API
          const mockAddress = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`

          setReport((prev) => ({
            ...prev,
            location: {
              latitude,
              longitude,
              address: mockAddress,
            },
          }))
          setLocationLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationLoading(false)
        },
      )
    }
  }

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setReport((prev) => ({
      ...prev,
      media: [...prev.media, ...files],
    }))
  }

  const removeMedia = (index: number) => {
    setReport((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Mock submission delay
    await new Promise((resolve) => setTimeout(resolve, 2500))

    setIsSubmitting(false)
    setStep(4) // Success step
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="hazard-type">Hazard Type *</Label>
        <Select value={report.type} onValueChange={(value) => setReport((prev) => ({ ...prev, type: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select hazard type" />
          </SelectTrigger>
          <SelectContent>
            {hazardTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="severity">Severity Level *</Label>
        <Select
          value={report.severity}
          onValueChange={(value: any) => setReport((prev) => ({ ...prev, severity: value }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                Low - Minor impact
              </div>
            </SelectItem>
            <SelectItem value="medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                Medium - Moderate impact
              </div>
            </SelectItem>
            <SelectItem value="high">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                High - Significant impact
              </div>
            </SelectItem>
            <SelectItem value="critical">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                Critical - Emergency response needed
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe what you observed. Include details about size, color, smell, or any other relevant information..."
          value={report.description}
          onChange={(e) => setReport((prev) => ({ ...prev, description: e.target.value }))}
          className="min-h-[100px]"
        />
      </div>

      <Button onClick={() => setStep(2)} className="w-full" disabled={!report.type || !report.description}>
        Next: Add Location & Media
      </Button>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Location *</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={getCurrentLocation}
            disabled={locationLoading}
            className="gap-2 bg-transparent"
          >
            {locationLoading ? <span className="animate-spin">⟳</span> : <span>📍</span>}
            Use Current Location
          </Button>
        </div>

        <Input
          placeholder="Enter location or address"
          value={report.location.address}
          onChange={(e) =>
            setReport((prev) => ({
              ...prev,
              location: { ...prev.location, address: e.target.value },
            }))
          }
        />

        {report.location.latitude !== 0 && (
          <Alert>
            <span className="mr-2">📍</span>
            <AlertDescription>
              Location captured: {report.location.latitude.toFixed(4)}, {report.location.longitude.toFixed(4)}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="space-y-4">
        <Label>Media (Photos/Videos)</Label>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
          <div className="text-center space-y-2">
            <span className="text-4xl block">📤</span>
            <div className="text-sm text-muted-foreground">
              <label htmlFor="media-upload" className="cursor-pointer text-primary hover:underline">
                Click to upload
              </label>{" "}
              or drag and drop
            </div>
            <p className="text-xs text-muted-foreground">PNG, JPG, MP4 up to 10MB each</p>
          </div>
          <input
            id="media-upload"
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleMediaUpload}
            className="hidden"
          />
        </div>

        {report.media.length > 0 && (
          <div className="space-y-2">
            <Label>Uploaded Files ({report.media.length})</Label>
            <div className="space-y-2">
              {report.media.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    {file.type.startsWith("image/") ? (
                      <span>📷</span>
                    ) : file.type.startsWith("video/") ? (
                      <span>🎥</span>
                    ) : (
                      <span>📄</span>
                    )}
                    <span className="text-sm truncate">{file.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {(file.size / 1024 / 1024).toFixed(1)}MB
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeMedia(index)}>
                    <span>✕</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          Back
        </Button>
        <Button onClick={() => setStep(3)} className="flex-1" disabled={!report.location.address}>
          Next: Contact Info
        </Button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Full Name *</Label>
          <Input
            id="contact-name"
            value={report.contactInfo.name}
            onChange={(e) =>
              setReport((prev) => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, name: e.target.value },
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-phone">Phone Number</Label>
          <Input
            id="contact-phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={report.contactInfo.phone}
            onChange={(e) =>
              setReport((prev) => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, phone: e.target.value },
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-email">Email Address *</Label>
          <Input
            id="contact-email"
            type="email"
            value={report.contactInfo.email}
            onChange={(e) =>
              setReport((prev) => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, email: e.target.value },
              }))
            }
          />
        </div>
      </div>

      <Alert>
        <span className="mr-2">⚠️</span>
        <AlertDescription>
          Your contact information will only be used by officials for follow-up if needed. It will not be shared
          publicly.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1"
          disabled={!report.contactInfo.name || !report.contactInfo.email || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Submitting...
            </>
          ) : (
            "Submit Report"
          )}
        </Button>
      </div>

      {isSubmitting && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading report...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="w-full" />
        </div>
      )}
    </div>
  )

  const renderStep4 = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <span className="text-6xl text-success">✅</span>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Report Submitted Successfully!</h3>
        <p className="text-muted-foreground">
          Thank you for helping keep our oceans safe. Your report has been received and will be reviewed by our team.
        </p>
      </div>

      <div className="p-4 bg-muted rounded-lg text-left space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Report ID:</span>
          <span className="font-mono">HR-{Date.now().toString().slice(-6)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Type:</span>
          <span>{report.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Severity:</span>
          <Badge variant={report.severity === "high" || report.severity === "critical" ? "destructive" : "secondary"}>
            {report.severity}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Status:</span>
          <Badge variant="outline">Under Review</Badge>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setStep(1)
            setReport({
              type: "",
              severity: "medium",
              description: "",
              location: { latitude: 0, longitude: 0, address: "" },
              media: [],
              contactInfo: { name: user?.name || "", phone: "", email: user?.email || "" },
            })
          }}
          className="flex-1"
        >
          Submit Another Report
        </Button>
        <Button onClick={onClose} className="flex-1">
          Back to Dashboard
        </Button>
      </div>
    </div>
  )

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Report Details"
      case 2:
        return "Location & Media"
      case 3:
        return "Contact Information"
      case 4:
        return "Submission Complete"
      default:
        return "Report Hazard"
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{getStepTitle()}</CardTitle>
            <CardDescription>{step < 4 ? `Step ${step} of 3` : "Report submitted successfully"}</CardDescription>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <span>✕</span>
            </Button>
          )}
        </div>

        {step < 4 && (
          <div className="flex space-x-2">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex-1 h-2 rounded-full ${stepNumber <= step ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </CardContent>
    </Card>
  )
}
