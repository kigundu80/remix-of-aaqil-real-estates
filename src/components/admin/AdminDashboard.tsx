
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, DonutChart } from "@/components/ui/chart";
import PropertyStatsCard from "./PropertyStatsCard";
import RecentActivitiesTable from "./RecentActivitiesTable";

const AdminDashboard = () => {
  // Demo data for statistics cards
  const statsData = [
    { title: "Total Properties", value: 24, change: "+4", icon: "Building" },
    { title: "Properties Sold", value: 7, change: "+1", icon: "Check" },
    { title: "Active Listings", value: 15, change: "-2", icon: "Eye" },
    { title: "New Inquiries", value: 32, change: "+6", icon: "Mail" },
  ];

  // Demo data for recent activities
  const recentActivities = [
    { user: "John Doe", action: "Added", date: "Today, 10:30 AM", title: "Luxury Villa" },
    { user: "Jane Smith", action: "Updated", date: "Yesterday, 3:45 PM", title: "Urban Apartment" },
    { user: "Mike Johnson", action: "Sold", date: "Apr 10, 2023", title: "Family House" },
    { user: "Sarah Wilson", action: "Pending", date: "Apr 9, 2023", title: "Beach Property" },
    { user: "Tom Brown", action: "Added", date: "Apr 8, 2023", title: "Mountain Cabin" },
  ];

  // Demo chart data
  const lineChartData = {
    data: [
      { name: "Jan", value: 3 },
      { name: "Feb", value: 5 },
      { name: "Mar", value: 7 },
      { name: "Apr", value: 4 },
      { name: "May", value: 8 },
      { name: "Jun", value: 12 },
    ],
    label: "Properties Listed",
    color: "#10b981",
    theme: { light: "#10b981", dark: "#10b981" },
  };

  const barChartData = {
    data: [
      { name: "Jan", value: 2 },
      { name: "Feb", value: 3 },
      { name: "Mar", value: 5 },
      { name: "Apr", value: 2 },
      { name: "May", value: 4 },
      { name: "Jun", value: 6 },
    ],
    label: "Properties Sold",
    color: "#f43f5e",
    theme: { light: "#f43f5e", dark: "#f43f5e" },
  };

  const donutChartData = {
    data: [
      { name: "Houses", value: 12 },
      { name: "Apartments", value: 8 },
      { name: "Land", value: 3 },
      { name: "Commercial", value: 4 },
    ],
    label: "Property Types",
    colors: ["#10b981", "#3b82f6", "#f43f5e", "#f59e0b"],
    theme: { light: ["#10b981", "#3b82f6", "#f43f5e", "#f59e0b"], dark: ["#10b981", "#3b82f6", "#f43f5e", "#f59e0b"] },
    valueFormatter: (value: any) => `${value} properties`,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats Row */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, i) => (
          <PropertyStatsCard key={i} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Properties Listed</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={lineChartData.data}
              categories={["value"]}
              index="name"
              colors={[lineChartData.color]}
              valueFormatter={(value) => `${value} properties`}
              className="h-72"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Properties Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={barChartData.data}
              categories={["value"]}
              index="name"
              colors={[barChartData.color]}
              valueFormatter={(value) => `${value} properties`}
              className="h-72"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Property Types</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={donutChartData.data}
              category="value"
              index="name"
              colors={donutChartData.colors}
              valueFormatter={donutChartData.valueFormatter}
              className="h-72"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivitiesTable activities={recentActivities} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
