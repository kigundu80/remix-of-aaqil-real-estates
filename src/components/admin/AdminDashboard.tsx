
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import PropertyStatsCard from "./PropertyStatsCard";
import RecentActivitiesTable from "./RecentActivitiesTable";
import { BuildingIcon, DollarSignIcon, UsersIcon, HomeIcon } from "lucide-react";
import { 
  LineChart,
  BarChart,
  Line, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

const AdminDashboard: React.FC = () => {
  const propertyStats = [
    {
      title: "Total Properties",
      value: 142,
      change: 12,
      icon: <BuildingIcon className="h-4 w-4" />,
      key: 1,
    },
    {
      title: "Total Sales",
      value: 354200,
      change: 5.4,
      icon: <DollarSignIcon className="h-4 w-4" />,
      key: 2,
    },
    {
      title: "Active Users",
      value: 2481,
      change: -2.5,
      icon: <UsersIcon className="h-4 w-4" />,
      key: 3,
    },
    {
      title: "New Listings",
      value: 38,
      change: 7.2,
      icon: <HomeIcon className="h-4 w-4" />,
      key: 4,
    },
  ];

  const lineChartData = [
    { name: "Jan", thisMonth: 10, lastMonth: 5 },
    { name: "Feb", thisMonth: 15, lastMonth: 10 },
    { name: "Mar", thisMonth: 5, lastMonth: 15 },
    { name: "Apr", thisMonth: 20, lastMonth: 10 },
    { name: "May", thisMonth: 30, lastMonth: 15 },
    { name: "Jun", thisMonth: 25, lastMonth: 20 },
    { name: "Jul", thisMonth: 40, lastMonth: 25 },
    { name: "Aug", thisMonth: 25, lastMonth: 20 },
    { name: "Sep", thisMonth: 38, lastMonth: 30 }
  ];

  const barChartData = [
    { name: "Jan", sales: 28000 },
    { name: "Feb", sales: 45000 },
    { name: "Mar", sales: 35000 },
    { name: "Apr", sales: 55000 },
    { name: "May", sales: 75000 },
    { name: "Jun", sales: 62000 }
  ];

  // Sample recent activities data
  const recentActivities = [
    {
      action: "Added",
      title: "Modern Luxury Villa",
      date: "2025-04-10",
      user: "Jane Smith"
    },
    {
      action: "Updated",
      title: "Downtown Apartment",
      date: "2025-04-09",
      user: "Mike Johnson"
    },
    {
      action: "Pending",
      title: "Forest View Condo",
      date: "2025-04-08",
      user: "Sarah Wilson"
    },
    {
      action: "Sold",
      title: "Beachfront Property",
      date: "2025-04-07",
      user: "Robert Davis"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {propertyStats.map((stat) => (
          <PropertyStatsCard
            key={stat.key}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Property Views</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="thisMonth" 
                  name="This Month"
                  stroke="hsl(var(--primary))" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="lastMonth" 
                  name="Last Month"
                  stroke="hsl(var(--muted-foreground))" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="sales" 
                  name="Sales" 
                  fill="hsl(var(--primary))" 
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivitiesTable activities={recentActivities} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
