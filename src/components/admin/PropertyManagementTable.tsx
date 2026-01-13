
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Car, Home, Sofa, Mountain } from "lucide-react";
import { useAdminProperties, useDeleteProperty } from "@/hooks/useProperties";
import { PropertyCategory } from "@/types/property";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PropertyManagementTable: React.FC = () => {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState<PropertyCategory | "all">("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const { data: properties = [], isLoading } = useAdminProperties(
    categoryFilter === "all" ? undefined : categoryFilter
  );
  const deleteProperty = useDeleteProperty();

  const editProperty = (id: string) => {
    navigate(`/admin/properties/edit/${id}`);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteProperty.mutate(deleteId);
      setDeleteId(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG', { 
      style: 'currency', 
      currency: 'UGX',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getCategoryIcon = (category: PropertyCategory) => {
    switch (category) {
      case "house":
        return <Home className="h-4 w-4" />;
      case "vehicle":
        return <Car className="h-4 w-4" />;
      case "furniture":
        return <Sofa className="h-4 w-4" />;
      case "land":
        return <Mountain className="h-4 w-4" />;
    }
  };

  const getCategoryLabel = (category: PropertyCategory) => {
    switch (category) {
      case "house":
        return "House";
      case "vehicle":
        return "Vehicle";
      case "furniture":
        return "Furniture";
      case "land":
        return "Land";
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as PropertyCategory | "all")}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="house" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Houses
          </TabsTrigger>
          <TabsTrigger value="vehicle" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            Vehicles
          </TabsTrigger>
          <TabsTrigger value="furniture" className="flex items-center gap-2">
            <Sofa className="h-4 w-4" />
            Furniture
          </TabsTrigger>
          <TabsTrigger value="land" className="flex items-center gap-2">
            <Mountain className="h-4 w-4" />
            Land
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : properties.length > 0 ? (
              properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center gap-1 w-fit">
                      {getCategoryIcon(property.category)}
                      {getCategoryLabel(property.category)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{property.title}</TableCell>
                  <TableCell>{formatPrice(property.price)}</TableCell>
                  <TableCell>{property.location || "-"}</TableCell>
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
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(property.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No properties found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this property.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PropertyManagementTable;
