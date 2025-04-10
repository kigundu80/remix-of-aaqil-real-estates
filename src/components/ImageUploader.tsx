
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { X, Image, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  onImagesUploaded?: (images: File[]) => void;
  maxImages?: number;
  label?: string;
  description?: string;
}

const ImageUploader = ({
  onImagesUploaded,
  maxImages = 5,
  label = "Upload Images",
  description = "Upload property images (PNG, JPG or JPEG)",
}: ImageUploaderProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: File[] = [];
    const newPreviewUrls: string[] = [];

    // Check for maximum number of images
    if (selectedImages.length + files.length > maxImages) {
      toast({
        title: `Maximum ${maxImages} images allowed`,
        description: `Please select fewer images.`,
        variant: "destructive",
      });
      return;
    }

    // Process each file
    Array.from(files).forEach(file => {
      // Check file type
      if (!file.type.match('image/(jpeg|jpg|png)')) {
        toast({
          title: "Invalid file type",
          description: "Only JPG, JPEG, and PNG files are allowed.",
          variant: "destructive",
        });
        return;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 5MB.",
          variant: "destructive",
        });
        return;
      }

      newFiles.push(file);
      newPreviewUrls.push(URL.createObjectURL(file));
    });

    setSelectedImages(prev => [...prev, ...newFiles]);
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);

    if (newFiles.length > 0 && onImagesUploaded) {
      onImagesUploaded([...selectedImages, ...newFiles]);
    }

    // Reset the input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const newSelectedImages = [...selectedImages];
    const newPreviewUrls = [...previewUrls];
    
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(newPreviewUrls[index]);
    
    newSelectedImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
    setSelectedImages(newSelectedImages);
    setPreviewUrls(newPreviewUrls);
    
    if (onImagesUploaded) {
      onImagesUploaded(newSelectedImages);
    }
  };

  const simulateUpload = () => {
    if (selectedImages.length === 0) {
      toast({
        title: "No images selected",
        description: "Please select at least one image to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload successful",
        description: `${selectedImages.length} image${selectedImages.length > 1 ? 's' : ''} uploaded.`,
      });
    }, 2000);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        <Label htmlFor="images">{label}</Label>
        <p className="text-sm text-gray-500">{description}</p>
        
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex-1"
          >
            <Image className="h-4 w-4 mr-2" />
            Select Images
          </Button>
          <Button
            type="button"
            onClick={simulateUpload}
            disabled={isUploading || selectedImages.length === 0}
            className="flex-1"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Images
              </>
            )}
          </Button>
        </div>
        <Input
          id="images"
          type="file"
          ref={fileInputRef}
          accept="image/jpeg, image/jpg, image/png"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {previewUrls.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">
            Selected Images ({selectedImages.length}/{maxImages})
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {previewUrls.map((url, index) => (
              <Card key={index} className="relative overflow-hidden group">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 opacity-80 hover:opacity-100"
                  onClick={() => handleRemoveImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
