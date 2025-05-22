
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const analyticsData = [
  { name: "Jan", engagements: 400, conversions: 240 },
  { name: "Feb", engagements: 300, conversions: 138 },
  { name: "Mar", engagements: 520, conversions: 380 },
  { name: "Apr", engagements: 480, conversions: 390 },
  { name: "May", engagements: 600, conversions: 480 },
  { name: "Jun", engagements: 700, conversions: 520 },
];

export const UserAnalyticsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Analytics</CardTitle>
        <CardDescription>
          User engagement and conversion metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[230px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={analyticsData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="engagements"
                stroke="#0ea5e9"
                fillOpacity={1}
                fill="url(#colorEngagement)"
                name="Engagements"
              />
              <Area
                type="monotone"
                dataKey="conversions"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorConversion)"
                name="Conversions"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
