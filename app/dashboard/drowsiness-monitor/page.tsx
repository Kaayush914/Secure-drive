"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Eye, AlertTriangle, CheckCircle, Clock, Camera, ToggleLeft } from "lucide-react"

export default function DrowsinessMonitorPage() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [alertLevel, setAlertLevel] = useState<"none" | "low" | "medium" | "high">("none")
  const [eyeOpenness, setEyeOpenness] = useState(95)
  const [headPosition, setHeadPosition] = useState(90)
  const [blinkRate, setBlinkRate] = useState(12)
  const [attentionScore, setAttentionScore] = useState(85)

  // Simulate real-time monitoring
  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      // Randomly fluctuate values to simulate real-time monitoring
      setEyeOpenness((prev) => Math.max(60, Math.min(100, prev + (Math.random() * 10 - 5))))
      setHeadPosition((prev) => Math.max(70, Math.min(100, prev + (Math.random() * 10 - 5))))
      setBlinkRate((prev) => Math.max(5, Math.min(30, prev + (Math.random() * 4 - 2))))

      // Calculate attention score based on other metrics
      const newAttentionScore = eyeOpenness * 0.4 + headPosition * 0.4 + (100 - blinkRate * 2) * 0.2
      setAttentionScore(Math.round(newAttentionScore))

      // Set alert level based on attention score
      if (newAttentionScore < 70) {
        setAlertLevel("high")
      } else if (newAttentionScore < 80) {
        setAlertLevel("medium")
      } else if (newAttentionScore < 90) {
        setAlertLevel("low")
      } else {
        setAlertLevel("none")
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isMonitoring, eyeOpenness, headPosition, blinkRate])

  const handleToggleMonitoring = () => {
    setIsMonitoring((prev) => !prev)
    if (!isMonitoring) {
      // Reset values when starting monitoring
      setEyeOpenness(95)
      setHeadPosition(90)
      setBlinkRate(12)
      setAttentionScore(85)
      setAlertLevel("none")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Drowsiness Monitor</h1>
        <p className="text-muted-foreground">Real-time monitoring of driver alertness using AI/ML technology</p>
      </div>

      {alertLevel === "high" && (
        <Alert variant="destructive" className="animate-pulse">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Drowsiness Detected!</AlertTitle>
          <AlertDescription>
            High level of drowsiness detected. Please pull over safely and take a break.
          </AlertDescription>
        </Alert>
      )}

      {alertLevel === "medium" && (
        <Alert variant="default" className="bg-amber-50 text-amber-800 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertTitle>Caution: Drowsiness Warning</AlertTitle>
          <AlertDescription className="text-amber-700">
            Signs of drowsiness detected. Consider taking a break soon.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Live Monitoring</CardTitle>
                <CardDescription>Real-time drowsiness detection from your vehicle's camera</CardDescription>
              </div>
              <Button onClick={handleToggleMonitoring} variant={isMonitoring ? "destructive" : "default"}>
                {isMonitoring ? <>Stop Monitoring</> : <>Start Monitoring</>}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative aspect-video bg-black rounded-md overflow-hidden flex items-center justify-center">
              {isMonitoring ? (
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="Driver monitoring camera feed"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-red-500 px-2 py-1 rounded-md text-white text-xs flex items-center">
                    <span className="mr-1 h-2 w-2 rounded-full bg-white animate-pulse"></span> LIVE
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-md text-white text-sm">
                    Attention Score: {attentionScore}%
                  </div>
                </div>
              ) : (
                <div className="text-white flex flex-col items-center">
                  <Camera className="h-12 w-12 mb-2" />
                  <p>Camera feed will appear here</p>
                  <p className="text-sm text-gray-400">Click "Start Monitoring" to begin</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Eye Openness</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xl font-bold">{Math.round(eyeOpenness)}%</span>
                    </div>
                    <Progress value={eyeOpenness} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Head Position</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xl font-bold">{Math.round(headPosition)}%</span>
                    </div>
                    <Progress value={headPosition} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Blink Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xl font-bold">{Math.round(blinkRate)}/min</span>
                    </div>
                    <Progress value={Math.min(100, blinkRate * 5)} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Attention Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      {alertLevel === "high" ? (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      ) : alertLevel === "medium" ? (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      <span className="text-xl font-bold">{attentionScore}%</span>
                    </div>
                    <Progress
                      value={attentionScore}
                      className="h-2"
                      style={
                        {
                          background:
                            alertLevel === "high" ? "#fee2e2" : alertLevel === "medium" ? "#fef3c7" : "#dcfce7",
                          "--progress-background":
                            alertLevel === "high" ? "#ef4444" : alertLevel === "medium" ? "#f59e0b" : "#22c55e",
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>Understanding our AI-powered drowsiness detection system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Eye Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI monitors your eye movements, blink rate, and eye closure duration to detect signs of
                    drowsiness.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <ToggleLeft className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Head Position Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    The system tracks head movements and position to identify nodding or drooping that indicates
                    fatigue.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Real-time Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    When signs of drowsiness are detected, the system provides audio and visual alerts to help you stay
                    alert.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Safety Tips</CardTitle>
            <CardDescription>Recommendations to prevent drowsy driving</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">Get 7-8 hours of sleep before long drives</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">Take a break every 2 hours or 100 miles</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">Avoid driving during peak sleepiness periods (midnight to 6am)</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">Travel with a passenger who can share driving responsibilities</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">If you feel drowsy, pull over to a safe place and take a 20-minute nap</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Download Safety Guide
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

