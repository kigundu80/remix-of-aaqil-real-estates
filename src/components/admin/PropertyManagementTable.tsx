
import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { mockProperties, PropertyType } from "@/types/property";

const PropertyManagementTable: React.FC = () => {
  const navigate = useNavigate();

  // Use the mockProperties data from the types file
  const properties = mockProperties;

  const editProperty = (id: string) => {
    navigate(`/admin/properties/edit/${id}`);
  };

  const deleteProperty = (id: string) => {
    // This would normally delete the property via API
    console.log(`Delete property ${id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.length > 0 ? (
            properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.title}</TableCell>
                <TableCell>{formatPrice(property.price)}</TableCell>
                <TableCell>{property.location}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      property.status === "available" ? "default" :
                      property.status === "sold" ? "destructive" : "secondary"
                    }
                  >
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => editProperty(property.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteProperty(property.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No properties found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PropertyManagementTable;
