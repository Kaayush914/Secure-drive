import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react"

export default function DrivingAnalysisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Driving Analysis</h1>
        <p className="text-muted-foreground">Review your driving patterns and AI-powered safety assessments</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Safety Score Overview</CardTitle>
          <CardDescription>Your driving safety score based on AI analysis of your driving patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-5xl font-bold">87</div>
            <div className="text-sm text-muted-foreground">out of 100</div>
            <Progress value={87} className="w-full max-w-md h-3 mt-2" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Speed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">92/100</div>
                <p className="text-xs text-muted-foreground">Excellent speed management</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Braking</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">88/100</div>
                <p className="text-xs text-muted-foreground">Good braking habits</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Alertness</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">78/100</div>
                <p className="text-xs text-muted-foreground">Occasional drowsiness detected</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Cornering</CardTitle>
                  <Info className="h-4 w-4 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">85/100</div>
                <p className="text-xs text-muted-foreground">Good cornering technique</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View Detailed Metrics
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Trips</TabsTrigger>
          <TabsTrigger value="drowsiness">Drowsiness Detection</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Driving Activity</CardTitle>
              <CardDescription>Your driving patterns from the last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Oct 25, 2024</Badge>
                      <span className="font-medium">Morning Commute</span>
                    </div>
                    <Badge className="bg-green-500">Safe</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Distance</p>
                      <p className="font-medium">12.5 miles</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">28 minutes</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg. Speed</p>
                      <p className="font-medium">32 mph</p>
                    </div>
                  </div>
                  <Button variant="link" className="px-0 mt-2">
                    View Trip Details
                  </Button>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Oct 23, 2024</Badge>
                      <span className="font-medium">Evening Drive</span>
                    </div>
                    <Badge className="bg-yellow-500">Caution</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Distance</p>
                      <p className="font-medium">8.3 miles</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">22 minutes</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg. Speed</p>
                      <p className="font-medium">28 mph</p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
                    <AlertTriangle className="h-4 w-4 inline-block mr-1" />
                    Drowsiness detected at 9:45 PM
                  </div>
                  <Button variant="link" className="px-0 mt-2">
                    View Trip Details
                  </Button>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Oct 20, 2024</Badge>
                      <span className="font-medium">Weekend Trip</span>
                    </div>
                    <Badge className="bg-green-500">Safe</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Distance</p>
                      <p className="font-medium">45.7 miles</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">52 minutes</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg. Speed</p>
                      <p className="font-medium">53 mph</p>
                    </div>
                  </div>
                  <Button variant="link" className="px-0 mt-2">
                    View Trip Details
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Trips
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="drowsiness" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Drowsiness Detection</CardTitle>
              <CardDescription>AI-powered analysis of your alertness while driving</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-4 bg-yellow-50">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <h3 className="font-medium">Drowsiness Detected</h3>
                </div>
                <p className="text-sm mb-4">
                  Our AI system detected signs of drowsiness during your evening drive on October 23. This could
                  increase your risk of accidents.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Date & Time</p>
                    <p className="font-medium">Oct 23, 2024, 9:45 PM</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">Approximately 3 minutes</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">Highway 101, Mile 45</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Severity</p>
                    <p className="font-medium">Moderate</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">How Our AI Detects Drowsiness</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our advanced AI system monitors several factors to detect signs of drowsiness:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Eye movement and blink patterns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Head position and movement</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Steering wheel grip and control</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Vehicle lane positioning and stability</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full">View Detailed Analysis</Button>
              <Button variant="outline" className="w-full">
                Download Safety Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Personalized suggestions to improve your driving safety</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Avoid Night Driving When Tired</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Based on our analysis, you show signs of drowsiness during evening drives. Consider avoiding driving
                  after 9 PM when possible, especially on weekdays.
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <Badge variant="outline">High Priority</Badge>
                  <span className="text-muted-foreground">Recommended on Oct 24, 2024</span>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Take Regular Breaks on Long Trips</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  On your weekend trip (Oct 20), we noticed slight signs of fatigue after 40 minutes of driving.
                  Consider taking a short break every 30-45 minutes during longer journeys.
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <Badge variant="outline">Medium Priority</Badge>
                  <span className="text-muted-foreground">Recommended on Oct 21, 2024</span>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Maintain Consistent Speed on Highways</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Your speed variations on highways could be improved. Try using cruise control when appropriate to
                  maintain a more consistent speed.
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <Badge variant="outline">Low Priority</Badge>
                  <span className="text-muted-foreground">Recommended on Oct 22, 2024</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Recommendations
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

