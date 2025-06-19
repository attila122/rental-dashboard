import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, FileText, MessageSquareText, Building2, CheckCircle, Loader2, AlertTriangle, TrendingUp } from "lucide-react";

export default function RentalDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Rental Property Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your rental property efficiently</p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Monthly Rent</p>
                  <p className="text-2xl font-bold text-blue-900">14,000 SEK</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Occupancy</p>
                  <p className="text-2xl font-bold text-green-900">100%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Days to Permit Renewal</p>
                  <p className="text-2xl font-bold text-yellow-900">304</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Unread Messages</p>
                  <p className="text-2xl font-bold text-purple-900">1</p>
                </div>
                <MessageSquareText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Property Status Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Building2 className="text-blue-500" /> Property Status
                </h2>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Occupied
                </Badge>
              </div>
              <div className="space-y-3">
                <p className="text-gray-600">Current tenant approved and moved in</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Property</Button>
                  <Button variant="outline" size="sm">Property Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Timeline */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <CheckCircle className="text-green-500" /> Recent Activity
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Tenant moved in</p>
                    <p className="text-xs text-gray-500">June 28, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Contract signed</p>
                    <p className="text-xs text-gray-500">June 19, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Viewing completed</p>
                    <p className="text-xs text-gray-500">June 18, 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rent Status */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <CheckCircle className="text-emerald-500" /> Payment Status
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">June 2025</span>
                  <Badge className="bg-green-100 text-green-800">Paid</Badge>
                </div>
                <p className="text-2xl font-bold text-emerald-600">14,000 SEK</p>
                <p className="text-sm text-gray-500">Received on June 1, 2025</p>
                <Button variant="outline" size="sm" className="w-full">
                  Download Receipt
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* BRF Permission Tracker */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FileText className="text-yellow-500" /> BRF Sublet Permit
                </h2>
                <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                  Active
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Expires:</span>
                  <span className="text-sm font-medium">May 2026</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
                <p className="text-xs text-gray-500">304 days remaining</p>
                <Button size="sm" className="w-full">
                  Prepare Renewal
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Messages/Support */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MessageSquareText className="text-purple-500" /> Messages
                </h2>
                <Badge variant="destructive">1 New</Badge>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium">From: Current Tenant</p>
                  <p className="text-sm text-gray-600 mt-1">"Can I get Wi-Fi info?"</p>
                  <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">Reply</Button>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar & Key Dates */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <CalendarDays className="text-red-500" /> Upcoming Events
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Rent Due</p>
                    <p className="text-xs text-gray-500">July 1, 2025 (12 days)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">BRF Permit Renewal</p>
                    <p className="text-xs text-gray-500">April 2026 (304 days)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Quarterly Review</p>
                    <p className="text-xs text-gray-500">September 2025</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}