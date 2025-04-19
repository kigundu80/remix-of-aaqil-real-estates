
import React from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, MailOpen, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

interface MessageListProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, setMessages }) => {
  const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(null);
  const { toast } = useToast();

  const handleOpenMessage = (message: Message) => {
    // Mark as read when opened
    if (!message.read) {
      setMessages(
        messages.map((msg) =>
          msg.id === message.id ? { ...msg, read: true } : msg
        )
      );
    }
    setSelectedMessage(message);
  };

  const handleCloseDialog = () => {
    setSelectedMessage(null);
  };

  const handleReplyEmail = () => {
    if (selectedMessage) {
      const subject = encodeURIComponent(`Re: ${selectedMessage.subject}`);
      const body = encodeURIComponent(
        `\n\n----Original Message----\n${selectedMessage.message}`
      );
      window.location.href = `mailto:${selectedMessage.email}?subject=${subject}&body=${body}`;
      
      toast({
        title: "Email Opened",
        description: "Your default email client has been opened with a pre-filled reply.",
      });
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No messages found
                </TableCell>
              </TableRow>
            ) : (
              messages.map((message) => (
                <TableRow
                  key={message.id}
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                    !message.read ? "font-medium bg-muted/20" : ""
                  }`}
                  onClick={() => handleOpenMessage(message)}
                >
                  <TableCell>
                    {message.read ? (
                      <MailOpen className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Mail className="h-4 w-4 text-blue-500" />
                    )}
                  </TableCell>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {message.subject}
                      {!message.read && (
                        <Badge variant="default" className="ml-2">New</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{message.email}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(new Date(message.date), "PPp")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedMessage} onOpenChange={() => handleCloseDialog()}>
        {selectedMessage && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedMessage.subject}</DialogTitle>
              <DialogDescription className="flex justify-between items-center">
                <span>From: {selectedMessage.name} ({selectedMessage.email})</span>
                <span className="text-xs">
                  {format(new Date(selectedMessage.date), "PPp")}
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="bg-muted/30 p-4 rounded-md max-h-[300px] overflow-y-auto">
              <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>
                Close
              </Button>
              <Button onClick={handleReplyEmail}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Reply via Email
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};
