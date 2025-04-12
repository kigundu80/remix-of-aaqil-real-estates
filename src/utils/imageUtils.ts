
import { toast } from "@/hooks/use-toast";

export interface ImageValidationOptions {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
}

export const validateImage = (
  file: File, 
  options: ImageValidationOptions = {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/jpg', 'image/png']
  }
): boolean => {
  // Check file type
  if (!options.allowedTypes?.some(type => file.type.match(type))) {
    toast({
      title: "Invalid file type",
      description: "Only JPG, JPEG, and PNG files are allowed.",
      variant: "destructive",
    });
    return false;
  }

  // Check file size
  if (file.size > (options.maxSize || 5 * 1024 * 1024)) {
    toast({
      title: "File too large",
      description: `Maximum file size is ${Math.floor((options.maxSize || 5 * 1024 * 1024) / (1024 * 1024))}MB.`,
      variant: "destructive",
    });
    return false;
  }

  return true;
};
