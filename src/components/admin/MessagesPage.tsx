import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { MessagesTab } from "@/components/admin/tabs/MessagesTab";
import { ActivitiesTab } from "@/components/admin/tabs/ActivitiesTab";
import { TabNotificationBadge } from "@/components/admin/notifications/TabNotificationBadge";
import { NotificationsHeader } from "@/components/admin/notifications/NotificationsHeader";

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
    autoResponse: "Thank you for your interest in our properties! We offer various residential and commercial properties across Uganda. Our team will contact you shortly with more information.",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Valuation Request",
    message: "I would like to request a valuation for my property in Entebbe.",
    date: "2025-04-12T16:45:00",
    read: true,
    autoResponse: "Thank you for your message! Our team will get back to you shortly.",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    subject: "Legal Consultation",
    message: "I need advice regarding property ownership transfer procedures.",
    date: "2025-04-11T09:15:00",
    read: false,
    autoResponse: "Thank you for your message! Our team will get back to you shortly.",
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
  {
    id: "5",
    type: "chatbot_response",
    user: "System",
    action: "Automatic reply",
    details: "Auto-replied to John Doe's property inquiry",
    timestamp: "2025-04-13T10:30:05",
    seen: false,
  },
];

const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [activities, setActivities] = useState(mockActivities);
  
  const unreadMessagesCount = messages.filter(msg => !msg.read).length;
  const unseenActivitiesCount = activities.filter(act => !act.seen).length;
  const totalNotifications = unreadMessagesCount + unseenActivitiesCount;

  return (
    <div className="space-y-6">
      <NotificationsHeader totalNotifications={totalNotifications} />

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="messages" className="relative">
            Messages
            <TabNotificationBadge count={unreadMessagesCount} />
          </TabsTrigger>
          <TabsTrigger value="activities" className="relative">
            Activities
            <TabNotificationBadge count={unseenActivitiesCount} />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <MessagesTab 
            messages={messages}
            setMessages={setMessages}
            unreadCount={unreadMessagesCount}
          />
        </TabsContent>

        <TabsContent value="activities">
          <ActivitiesTab
            activities={activities}
            setActivities={setActivities}
            unseenCount={unseenActivitiesCount}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MessagesPage;
