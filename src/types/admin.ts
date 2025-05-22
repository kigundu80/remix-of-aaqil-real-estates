
export interface UserData {
  id: string;
  name: string;
  email: string;
  dataPoints: number;
  value: number; // BTC value
  lastActive: string;
  status: "active" | "inactive" | "pending";
  notified?: boolean; // Track if user has been notified about conversion
}
