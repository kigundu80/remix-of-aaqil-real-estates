
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot } from "lucide-react";
import { MessageList } from "@/components/admin/MessageList";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  autoResponse?: string;
}

interface MessagesTabProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  unreadCount: number;
}

export const MessagesTab: React.FC<MessagesTabProps> = ({
  messages,
  setMessages,
  unreadCount,
}) => {
  const { toast } = useToast();
  
  const markAllMessagesAsRead = () => {
    setMessages(messages.map(msg => ({ ...msg, read: true })));
    toast({
      title: "Messages Updated",
      description: "All messages have been marked as read.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Contact Messages</CardTitle>
            <CardDescription>
              Messages received from the contact form
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Bot className="h-4 w-4 mr-1 text-blue-500" />
              <span>Auto-responses enabled</span>
            </div>
            {unreadCount > 0 && (
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={markAllMessagesAsRead}
              >
                Mark all as read
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <MessageList messages={messages} setMessages={setMessages} />
      </CardContent>
    </Card>
  );
};
