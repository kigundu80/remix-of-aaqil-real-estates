
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyStatsCard } from "./PropertyStatsCard";
import { RecentActivitiesTable } from "./RecentActivitiesTable";
import { ChartContainer } from "@/components/ui/chart/chart-container";
import type { ChartConfig } from "@/components/ui/chart/types";

const AdminDashboard: React.FC = () => {
  const dummyData = {
    totalProperties: 187,
    availableProperties: 104,
    pendingProperties: 32,
    soldProperties: 51,
    recentActivities: [
      { action: "Property Added", title: "Sunny Gardens Villa", date: "2023-05-01", user: "admin@example.com" },
      { action: "Property Sold", title: "Mountain View Cottage", date: "2023-04-28", user: "john@example.com" },
      { action: "Property Updated", title: "Downtown Apartment", date: "2023-04-26", user: "admin@example.com" },
      { action: "Property Added", title: "Seaside Villa", date: "2023-04-25", user: "sarah@example.com" },
      { action: "Property Pending", title: "Forest Retreat", date: "2023-04-23", user: "admin@example.com" },
    ]
  };

  // Fix chartConfig to match ChartConfig type
  const chartConfig: ChartConfig = {
    color: "#10b981", // Using a green color
    data: [
      { label: "Jan", value: 12 },
      { label: "Feb", value: 18 },
      { label: "Mar", value: 15 },
      { label: "Apr", value: 25 },
      { label: "May", value: 32 },
      { label: "Jun", value: 28 },
    ],
    categories: ["label"],
    index: "label",
    valueFormatter: (value) => `${value} sales`
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">View key metrics and recent activities</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <PropertyStatsCard title="Total Properties" value={dummyData.totalProperties} icon="building" />
        <PropertyStatsCard title="Available" value={dummyData.availableProperties} icon="home" />
        <PropertyStatsCard title="Pending" value={dummyData.pendingProperties} icon="clock" />
        <PropertyStatsCard title="Sold" value={dummyData.soldProperties} icon="check-circle" />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <ChartContainer config={chartConfig} className="h-[300px]">
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Property sales by month</p>
            </div>
          </ChartContainer>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Detailed analytics coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivitiesTable activities={dummyData.recentActivities} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
