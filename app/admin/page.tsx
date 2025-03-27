import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Users, FileText, DollarSign } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin! Here's an overview of the insurance operations.</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          There are 5 new claims awaiting review and 3 policy renewals pending approval.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+24 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,132</div>
            <p className="text-xs text-muted-foreground">98% retention rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">12 pending review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$842,500</div>
            <p className="text-xs text-muted-foreground">+15% from last quarter</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Customers</CardTitle>
              <CardDescription>Overview of recently registered customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-3 font-medium border-b">
                  <div>Customer ID</div>
                  <div>Name</div>
                  <div>Policy Status</div>
                  <div>Join Date</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-5 p-3 items-center">
                    <div className="font-mono text-sm">SD-10045782</div>
                    <div>John Doe</div>
                    <div>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="text-sm">Jan 15, 2023</div>
                    <div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 p-3 items-center">
                    <div className="font-mono text-sm">SD-10045783</div>
                    <div>Jane Smith</div>
                    <div>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="text-sm">Feb 22, 2023</div>
                    <div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 p-3 items-center">
                    <div className="font-mono text-sm">SD-10045784</div>
                    <div>Robert Johnson</div>
                    <div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <div className="text-sm">Mar 10, 2023</div>
                    <div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 p-3 items-center">
                    <div className="font-mono text-sm">SD-10045785</div>
                    <div>Emily Davis</div>
                    <div>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="text-sm">Apr 5, 2023</div>
                    <div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 p-3 items-center">
                    <div className="font-mono text-sm">SD-10045786</div>
                    <div>Michael Wilson</div>
                    <div>
                      <Badge variant="destructive">Expired</Badge>
                    </div>
                    <div className="text-sm">May 18, 2023</div>
                    <div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View All Customers
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Claims</CardTitle>
              <CardDescription>Overview of recently filed insurance claims</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-3 font-medium border-b">
                  <div>Claim ID</div>
                  <div>Customer</div>
                  <div>Date Filed</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-6 p-3 items-center">
                    <div className="font-mono text-sm">CL-78945</div>
                    <div>John Doe</div>
                    <div className="text-sm">Feb 15, 2024</div>
                    <div>$2,450</div>
                    <div>
                      <Badge>Approved</Badge>
                    </div>
                    <div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 p-3 items-center">
                    <div className="font-mono text-sm">CL-78946</div>
                    <div>Emily Davis</div>
                    <div className="text-sm">Mar 22, 2024</div>
                    <div>$5,780</div>
                    <div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 p-3 items-center">
                    <div className="font-mono text-sm">CL-78947</div>
                    <div>Robert Johnson</div>
                    <div className="text-sm">Apr 10, 2024</div>
                    <div>$1,200</div>
                    <div>
                      <Badge variant="outline">Under Review</Badge>
                    </div>
                    <div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 p-3 items-center">
                    <div className="font-mono text-sm">CL-78948</div>
                    <div>Jane Smith</div>
                    <div className="text-sm">Apr 18, 2024</div>
                    <div>$3,600</div>
                    <div>
                      <Badge variant="destructive">Rejected</Badge>
                    </div>
                    <div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 p-3 items-center">
                    <div className="font-mono text-sm">CL-78949</div>
                    <div>Michael Wilson</div>
                    <div className="text-sm">May 5, 2024</div>
                    <div>$8,200</div>
                    <div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View All Claims
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Safety Analytics</CardTitle>
              <CardDescription>Overview of driver safety metrics across all customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Average Safety Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">82/100</div>
                    <div className="h-4 mt-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-green-500 w-[82%]"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">+3 points from last quarter</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Drowsiness Incidents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">124</div>
                    <div className="h-4 mt-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-amber-500 w-[45%]"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">-12% from last quarter</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Claims Frequency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7.2%</div>
                    <div className="h-4 mt-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-blue-500 w-[28%]"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Industry average: 9.5%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">AI Intervention Success</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">94%</div>
                    <div className="h-4 mt-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-green-500 w-[94%]"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">+2% from last quarter</p>
                  </CardContent>
                </Card>
              </div>
              <Button variant="outline" className="w-full">
                View Detailed Analytics
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

