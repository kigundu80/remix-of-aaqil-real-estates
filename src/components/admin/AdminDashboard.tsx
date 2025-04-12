
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, User, DollarSign, Calendar } from "lucide-react";
import { PropertyStatsCard } from "./PropertyStatsCard";
import { RecentActivitiesTable } from "./RecentActivitiesTable";
import { Chart, ChartContainer, ChartLegend, ChartTooltip } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const AdminDashboard: React.FC = () => {
  // This would normally be fetched from an API
  const stats = [
    { title: "Total Properties", value: 127, icon: Building, change: 12 },
    { title: "Registered Users", value: 356, icon: User, change: 8 },
    { title: "Revenue", value: "$92,435", icon: DollarSign, change: -2 },
    { title: "Pending Approvals", value: 9, icon: Calendar, change: 0 }
  ];

  const propertyTypeData = [
    { name: "Land", value: 45 },
    { name: "Residential", value: 30 },
    { name: "Commercial", value: 15 },
    { name: "Agricultural", value: 10 }
  ];

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your properties and users</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <PropertyStatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Property Types</CardTitle>
            <CardDescription>Distribution of property types</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ChartContainer className="h-[300px]">
              <PieChart>
                <Pie
                  data={propertyTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {propertyTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivitiesTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
