
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

// Sample user data - would typically be fetched from an API
const sampleUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    registeredDate: "2023-04-15",
    lastLogin: "2023-09-22"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    status: "active",
    registeredDate: "2023-02-10",
    lastLogin: "2023-09-24"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "user",
    status: "inactive",
    registeredDate: "2023-06-20",
    lastLogin: "2023-08-15"
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "user",
    status: "pending",
    registeredDate: "2023-09-18",
    lastLogin: "Never"
  }
];

export const UserManagementTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(sampleUsers);
  const { toast } = useToast();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleActivateUser = (id: string) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status: "active" } : user
    ));
    toast({
      title: "User Activated",
      description: "User has been activated successfully."
    });
  };

  const handleDeactivateUser = (id: string) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status: "inactive" } : user
    ));
    toast({
      title: "User Deactivated",
      description: "User has been deactivated successfully."
    });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    toast({
      title: "User Deleted",
      description: "User has been removed from the system."
    });
  };

  const handleContactUser = (email: string) => {
    // In a real app, this might open an email compose window or a message form
    toast({
      title: "Contact User",
      description: `Contacting user at ${email}`
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.role === "admin" ? "default" : "outline"}
                      className="capitalize"
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" :
                        user.status === "inactive" ? "secondary" : "outline"
                      }
                      className="capitalize"
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.registeredDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleContactUser(user.email)}
                        title="Contact User"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      
                      {user.status !== "active" && (
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="text-green-600"
                          onClick={() => handleActivateUser(user.id)}
                          title="Activate User"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {user.status === "active" && (
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="text-amber-500"
                          onClick={() => handleDeactivateUser(user.id)}
                          title="Deactivate User"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="text-red-600"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete User"
                      >
                        <span className="text-xl leading-none">&times;</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
