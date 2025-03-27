import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ClaimsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Claims Management</h1>
          <p className="text-muted-foreground">Review and process insurance claims</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">Generate Report</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <CardTitle>Claims Database</CardTitle>
              <CardDescription>A comprehensive list of all insurance claims</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Claims</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="search" placeholder="Search claims..." className="h-9" />
                <Button type="submit" size="sm" className="h-9">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-7 p-3 font-medium border-b">
              <div>Claim ID</div>
              <div>Customer</div>
              <div>Date Filed</div>
              <div>Amount</div>
              <div>Type</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            <div className="divide-y">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="grid grid-cols-7 p-3 items-center">
                  <div className="font-mono text-sm">CL-7894{i}</div>
                  <div>{["John Doe", "Jane Smith", "Robert Johnson", "Emily Davis", "Michael Wilson"][i % 5]}</div>
                  <div className="text-sm">
                    {["Feb 15, 2024", "Mar 22, 2024", "Apr 10, 2024", "Apr 18, 2024", "May 5, 2024"][i % 5]}
                  </div>
                  <div>${[2450, 5780, 1200, 3600, 8200][i % 5]}</div>
                  <div>
                    {i % 4 === 0 && <Badge variant="outline">Collision</Badge>}
                    {i % 4 === 1 && <Badge variant="outline">Theft</Badge>}
                    {i % 4 === 2 && <Badge variant="outline">Damage</Badge>}
                    {i % 4 === 3 && <Badge variant="outline">Liability</Badge>}
                  </div>
                  <div>
                    {i % 4 === 0 && <Badge>Approved</Badge>}
                    {i % 4 === 1 && <Badge variant="outline">Pending</Badge>}
                    {i % 4 === 2 && <Badge variant="outline">Under Review</Badge>}
                    {i % 4 === 3 && <Badge variant="destructive">Rejected</Badge>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Process
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>87</strong> claims
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

