
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import ImageUploader from "@/components/ImageUploader";
import { PropertyFormValues } from "@/types/property";
import PropertyFormFields from "./PropertyFormFields";
import PropertyFormFooter from "./PropertyFormFooter";
import { FormLabel } from "@/components/ui/form";

interface PropertyFormProps {
  initialValues?: Partial<PropertyFormValues>;
  onSubmit: (data: PropertyFormValues) => void;
  isLoading?: boolean;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ initialValues, onSubmit, isLoading = false }) => {
  const defaultValues: Partial<PropertyFormValues> = {
    title: "",
    description: "",
    price: "",
    location: "",
    size: "",
    bedrooms: 0,
    bathrooms: 0,
    features: "",
    status: "available",
    type: "house",
    ...initialValues
  };

  const form = useForm<PropertyFormValues>({
    defaultValues
  });

  const handleSubmit = (data: PropertyFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <PropertyFormFields form={form} />

        <div className="space-y-2">
          <FormLabel>Images</FormLabel>
          <ImageUploader />
        </div>

        <PropertyFormFooter 
          isLoading={isLoading} 
          isEditing={!!initialValues?.title}
        />
      </form>
    </Form>
  );
};

export default PropertyForm;
