
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart } from "@/components/ui/chart";
import PropertyStatsCard from "./PropertyStatsCard";
import RecentActivitiesTable from "./RecentActivitiesTable";
import { BuildingIcon, DollarSignIcon, UsersIcon, HomeIcon } from "lucide-react";

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

  const lineChartData = {
    datasets: [
      {
        label: "This Month",
        data: [10, 15, 5, 20, 30, 25, 40, 25, 38],
        borderColor: "hsl(var(--primary))",
      },
      {
        label: "Last Month",
        data: [5, 10, 15, 10, 15, 20, 25, 20, 30],
        borderColor: "hsl(var(--muted-foreground))",
      },
    ],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  };

  const barChartData = {
    datasets: [
      {
        label: "Sales",
        data: [28000, 45000, 35000, 55000, 75000, 62000],
        backgroundColor: "hsl(var(--primary))",
      },
    ],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  };

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
          <CardContent>
            <Chart 
              type="line"
              data={lineChartData} 
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
              height={300}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart 
              type="bar"
              data={barChartData} 
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
              height={300}
            />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivitiesTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
