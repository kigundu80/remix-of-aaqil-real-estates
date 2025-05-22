
import React from "react";
import { Button } from "@/components/ui/button";

interface PropertyFormFooterProps {
  isLoading: boolean;
  isEditing: boolean;
}

const PropertyFormFooter: React.FC<PropertyFormFooterProps> = ({ isLoading, isEditing }) => {
  return (
    <div className="flex justify-end">
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Saving...
          </div>
        ) : isEditing ? "Update Property" : "Create Property"}
      </Button>
    </div>
  );
};

export default PropertyFormFooter;
