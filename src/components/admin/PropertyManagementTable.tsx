
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
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { PropertyType } from "@/types/property";
import { useToast } from "@/components/ui/use-toast";

// Sample data - would typically be fetched from an API
const sampleProperties: PropertyType[] = [
  {
    id: "1",
    title: "Beachfront Land",
    description: "Beautiful beachfront property with ocean views",
    price: 350000,
    location: "Mombasa, Kenya",
    size: "2 acres",
    images: ["/placeholder.svg"],
    features: ["Ocean view", "Flat terrain", "Ready for development"],
    status: "available"
  },
  {
    id: "2",
    title: "Farmland Plot",
    description: "Fertile agricultural land perfect for farming",
    price: 125000,
    location: "Nakuru, Kenya",
    size: "5 acres",
    images: ["/placeholder.svg"],
    features: ["Fertile soil", "Water access", "Road access"],
    status: "pending"
  },
  {
    id: "3",
    title: "City Center Plot",
    description: "Prime location in the heart of the city",
    price: 750000,
    location: "Nairobi, Kenya",
    size: "0.5 acres",
    images: ["/placeholder.svg"],
    features: ["Prime location", "Commercial zoning", "High traffic area"],
    status: "sold"
  }
];

export const PropertyManagementTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState(sampleProperties);
  const { toast } = useToast();

  const filteredProperties = properties.filter(property => 
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProperty = (id: string) => {
    setProperties(prev => prev.filter(property => property.id !== id));
    toast({
      title: "Property Deleted",
      description: "The property has been removed successfully."
    });
  };

  const handleStatusChange = (id: string, newStatus: 'available' | 'pending' | 'sold') => {
    setProperties(prev => prev.map(property => 
      property.id === id ? { ...property, status: newStatus } : property
    ));
    toast({
      title: "Status Updated",
      description: `Property status changed to ${newStatus}.`
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button asChild>
          <a href="/admin/properties/add">Add New Property</a>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No properties found
                </TableCell>
              </TableRow>
            ) : (
              filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.title}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.size}</TableCell>
                  <TableCell>${property.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        property.status === "available" ? "default" :
                        property.status === "pending" ? "outline" : "secondary"
                      }
                      className="capitalize"
                    >
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/admin/properties/edit/${property.id}`}>Edit</a>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            ⋮
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <a href={`/properties/${property.id}`}>View Details</a>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(property.id, 'available')}>
                            Mark as Available
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(property.id, 'pending')}>
                            Mark as Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(property.id, 'sold')}>
                            Mark as Sold
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteProperty(property.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
