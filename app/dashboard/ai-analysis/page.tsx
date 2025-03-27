"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, ArrowRight, MessageSquare } from "lucide-react"

export default function AIAnalysisPage() {
  const [showingAnalysis, setShowingAnalysis] = useState(false)
  const [analysisLoading, setAnalysisLoading] = useState(false)

  const handleShowAnalysis = () => {
    setAnalysisLoading(true)
    setTimeout(() => {
      setAnalysisLoading(false)
      setShowingAnalysis(true)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Analysis</h1>
        <p className="text-muted-foreground">Advanced AI assessment of your driving patterns and risk profile</p>
      </div>

      <Tabs defaultValue="risk" className="space-y-4">
        <TabsList>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="claims">Claims Analysis</TabsTrigger>
          <TabsTrigger value="chatbot">AI Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Driving Risk Assessment</CardTitle>
              <CardDescription>AI-powered analysis of your driving behavior and risk factors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Recent Trip Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select a recent trip to analyze your driving behavior in detail
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Oct 25, 2024</Badge>
                      <span className="font-medium">Morning Commute</span>
                    </div>
                    <Button size="sm" onClick={handleShowAnalysis} disabled={analysisLoading}>
                      {analysisLoading ? "Analyzing..." : "Analyze"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Oct 23, 2024</Badge>
                      <span className="font-medium">Evening Drive</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Analyze
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Oct 20, 2024</Badge>
                      <span className="font-medium">Weekend Trip</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Analyze
                    </Button>
                  </div>
                </div>
              </div>

              {showingAnalysis && (
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Trip Analysis: Morning Commute (Oct 25)</CardTitle>
                      <Badge className="bg-green-500">Low Risk</Badge>
                    </div>
                    <CardDescription>AI-powered detailed analysis of your driving patterns</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="rounded-md border p-3">
                        <h4 className="text-sm font-medium mb-1">Speed Management</h4>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Excellent</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Consistent speed, appropriate for conditions
                        </p>
                      </div>

                      <div className="rounded-md border p-3">
                        <h4 className="text-sm font-medium mb-1">Braking Patterns</h4>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Good</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Smooth braking with good anticipation</p>
                      </div>

                      <div className="rounded-md border p-3">
                        <h4 className="text-sm font-medium mb-1">Alertness</h4>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Excellent</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Fully alert throughout the journey</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-2">AI Assessment</h4>
                      <div className="rounded-md bg-muted p-4 text-sm">
                        <p className="mb-2">
                          Based on our AI analysis, this trip demonstrates excellent driving habits. You maintained
                          appropriate speeds, showed good anticipation of traffic conditions, and remained alert
                          throughout the journey.
                        </p>
                        <p className="mb-2">
                          Your smooth acceleration and braking patterns indicate a fuel-efficient driving style that
                          also minimizes wear on your vehicle.
                        </p>
                        <p>
                          This driving pattern is associated with a very low accident risk profile. Maintaining these
                          habits could qualify you for our safe driver discount on your next policy renewal.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-md border p-4 bg-green-50">
                      <div className="flex items-start space-x-2">
                        <div className="bg-green-100 p-2 rounded-full mt-1">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-green-800">Insurance Recommendation</h4>
                          <p className="text-sm text-green-700 mt-1">
                            Based on this analysis, you qualify for our Safe Driver Program. This could reduce your
                            premium by up to 15% at your next renewal.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Further Analysis <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Claims Analysis</CardTitle>
              <CardDescription>AI-powered assessment of your claims history and risk profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Claims History Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI has analyzed your claims history and driving patterns
                </p>

                <div className="space-y-4">
                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Feb 15, 2024</Badge>
                        <span className="font-medium">Minor Collision</span>
                      </div>
                      <Badge>Approved</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      Rear-end collision at low speed, no injuries reported
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <h4 className="text-sm font-medium text-blue-800 mb-1">AI Assessment</h4>
                      <p className="text-xs text-blue-700">
                        This incident appears to be a common low-speed collision with minimal impact on your risk
                        profile. Our AI analysis of your driving patterns before and after this incident shows improved
                        caution at intersections, suggesting you've adjusted your driving behavior positively.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Risk Profile Assessment</CardTitle>
                  <CardDescription>AI-generated risk assessment based on your driving history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-muted p-4 text-sm">
                    <p className="mb-2">
                      Based on our comprehensive AI analysis of your driving patterns, claims history, and vehicle
                      usage, you are currently classified as a <span className="font-medium">Low-Risk Driver</span>.
                    </p>
                    <p className="mb-2">
                      Your single minor claim in February 2024 has been offset by your excellent driving behavior over
                      the past 8 months, particularly your consistent speed management and alertness during commutes.
                    </p>
                    <p>
                      Our predictive models suggest you have a 92% probability of remaining claim-free for the next 12
                      months, which places you in our preferred risk category.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Detailed Risk Assessment</Button>
                </CardFooter>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chatbot" className="space-y-4">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Gemini-Powered Insurance Assistant</CardTitle>
              <CardDescription>Ask questions about your policy, claims, or get driving advice</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto border rounded-md p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary p-2 rounded-full">
                  <MessageSquare className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg p-3 text-sm max-w-[80%]">
                  Hello John! I'm your SafeDrive AI assistant. How can I help you today? You can ask me about your
                  policy, claims process, or get personalized driving advice.
                </div>
              </div>

              <div className="flex items-start gap-3 justify-end">
                <div className="bg-primary/10 rounded-lg p-3 text-sm max-w-[80%]">
                  Can you tell me when my policy renews?
                </div>
                <div className="bg-background border p-2 rounded-full">
                  <MessageSquare className="h-4 w-4" />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary p-2 rounded-full">
                  <MessageSquare className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg p-3 text-sm max-w-[80%]">
                  Your current policy is set to renew on December 31, 2025. Based on your excellent driving record,
                  you're currently on track for a 12% discount on your renewal premium. Would you like me to send you a
                  detailed breakdown of your coverage and potential savings?
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex w-full items-center space-x-2">
                <Input className="flex-1" placeholder="Type your message..." disabled={false} />
                <Button type="submit">Send</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

