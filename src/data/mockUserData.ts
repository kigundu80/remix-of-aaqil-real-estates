
import { UserData } from "@/types/admin";

// Sample user data for demonstration
export const usersData: UserData[] = [
  {
    id: "1",
    name: "Kiggundu Akram",
    email: "akram@hmproperty.com",
    dataPoints: 35,
    value: 0.00175, // BTC value
    lastActive: "2023-09-24",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    dataPoints: 28,
    value: 0.00140, // BTC value
    lastActive: "2023-09-22",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    dataPoints: 21,
    value: 0.00105, // BTC value
    lastActive: "2023-08-15",
    status: "inactive",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    dataPoints: 15,
    value: 0.00075, // BTC value
    lastActive: "2023-09-18",
    status: "pending",
  },
];
