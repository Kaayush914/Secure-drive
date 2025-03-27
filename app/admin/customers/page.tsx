import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, UserPlus } from "lucide-react"

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage and view all customer accounts and policies</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customer Database</CardTitle>
              <CardDescription>A comprehensive list of all insurance customers</CardDescription>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="search" placeholder="Search customers..." className="h-9" />
              <Button type="submit" size="sm" className="h-9">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-7 p-3 font-medium border-b">
              <div>Customer ID</div>
              <div>Name</div>
              <div>Email</div>
              <div>Policy Status</div>
              <div>Safety Score</div>
              <div>Join Date</div>
              <div>Actions</div>
            </div>
            <div className="divide-y">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="grid grid-cols-7 p-3 items-center">
                  <div className="font-mono text-sm">SD-1004578{i}</div>
                  <div>{["John Doe", "Jane Smith", "Robert Johnson", "Emily Davis", "Michael Wilson"][i % 5]}</div>
                  <div className="text-sm truncate">
                    {
                      [
                        "john@example.com",
                        "jane@example.com",
                        "robert@example.com",
                        "emily@example.com",
                        "michael@example.com",
                      ][i % 5]
                    }
                  </div>
                  <div>
                    {i % 5 === 0 && <Badge variant="outline">Pending</Badge>}
                    {i % 5 === 1 && <Badge className="bg-green-500">Active</Badge>}
                    {i % 5 === 2 && <Badge className="bg-green-500">Active</Badge>}
                    {i % 5 === 3 && <Badge variant="destructive">Expired</Badge>}
                    {i % 5 === 4 && <Badge className="bg-green-500">Active</Badge>}
                  </div>
                  <div>
                    {i % 5 === 0 && <Badge variant="outline">N/A</Badge>}
                    {i % 5 === 1 && <Badge className="bg-green-500">92</Badge>}
                    {i % 5 === 2 && <Badge className="bg-amber-500">78</Badge>}
                    {i % 5 === 3 && <Badge variant="outline">N/A</Badge>}
                    {i % 5 === 4 && <Badge className="bg-green-500">85</Badge>}
                  </div>
                  <div className="text-sm">
                    {["Jan 15, 2023", "Feb 22, 2023", "Mar 10, 2023", "Apr 5, 2023", "May 18, 2023"][i % 5]}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>248</strong> customers
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

