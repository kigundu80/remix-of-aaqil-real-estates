
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { MessageList } from "@/components/admin/MessageList";
import { ActivitiesLog } from "@/components/admin/ActivitiesLog";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

// Mock data for demonstration
const mockMessages = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Property Inquiry",
    message: "I'm interested in the property at Kampala Road. Is it still available?",
    date: "2025-04-13T10:30:00",
    read: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Valuation Request",
    message: "I would like to request a valuation for my property in Entebbe.",
    date: "2025-04-12T16:45:00",
    read: true,
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    subject: "Legal Consultation",
    message: "I need advice regarding property ownership transfer procedures.",
    date: "2025-04-11T09:15:00",
    read: false,
  },
];

// Simulated activities from various parts of the application
const mockActivities = [
  {
    id: "1",
    type: "contact_form",
    user: "Sarah Williams",
    email: "sarah@example.com",
    action: "Submitted contact form",
    details: "Property inquiry about beachfront properties",
    timestamp: "2025-04-13T14:20:00",
    seen: false,
  },
  {
    id: "2",
    type: "property_view",
    user: "Guest User",
    action: "Viewed property details",
    details: "Property ID: 12345 - Luxury Villa",
    timestamp: "2025-04-13T13:45:00",
    seen: true,
  },
  {
    id: "3",
    type: "payment",
    user: "Robert Chen",
    email: "robert@example.com",
    action: "Made payment",
    details: "UGX 500,000 for property booking",
    timestamp: "2025-04-12T11:30:00",
    seen: false,
  },
  {
    id: "4",
    type: "registration",
    user: "Emily Davis",
    email: "emily@example.com",
    action: "Created new account",
    details: "New user registration",
    timestamp: "2025-04-11T16:20:00",
    seen: true,
  },
];

const MessagesPage: React.FC = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState(mockMessages);
  const [activities, setActivities] = useState(mockActivities);
  
  const unreadMessagesCount = messages.filter(msg => !msg.read).length;
  const unseenActivitiesCount = activities.filter(act => !act.seen).length;
  
  const markAllMessagesAsRead = () => {
    setMessages(messages.map(msg => ({ ...msg, read: true })));
    toast({
      title: "Messages Updated",
      description: "All messages have been marked as read.",
    });
  };
  
  const markAllActivitiesAsSeen = () => {
    setActivities(activities.map(act => ({ ...act, seen: true })));
    toast({
      title: "Activities Updated",
      description: "All activities have been marked as seen.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">Notifications</h1>
            <Bell className="h-5 w-5 text-amber-500" />
            {(unreadMessagesCount + unseenActivitiesCount > 0) && (
              <Badge variant="destructive" className="ml-2">
                {unreadMessagesCount + unseenActivitiesCount} new
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            Manage incoming messages and user activities
          </p>
        </div>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="messages" className="relative">
            Messages
            {unreadMessagesCount > 0 && (
              <Badge
                variant="destructive"
                className="ml-2 absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {unreadMessagesCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="activities" className="relative">
            Activities
            {unseenActivitiesCount > 0 && (
              <Badge
                variant="destructive"
                className="ml-2 absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {unseenActivitiesCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Contact Messages</CardTitle>
                  <CardDescription>
                    Messages received from the contact form
                  </CardDescription>
                </div>
                {unreadMessagesCount > 0 && (
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                    onClick={markAllMessagesAsRead}
                  >
                    Mark all as read
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <MessageList messages={messages} setMessages={setMessages} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>User Activities</CardTitle>
                  <CardDescription>
                    Recent activities from users across the platform
                  </CardDescription>
                </div>
                {unseenActivitiesCount > 0 && (
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                    onClick={markAllActivitiesAsSeen}
                  >
                    Mark all as seen
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ActivitiesLog activities={activities} setActivities={setActivities} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessagesPage;
