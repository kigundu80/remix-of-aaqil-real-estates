
import { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { validateImage } from "@/utils/imageUtils";
import ImageUploadControls from "@/components/ImageUploadControls";
import ImagePreviewGrid from "@/components/ImagePreviewGrid";

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
      if (validateImage(file)) {
        newFiles.push(file);
        newPreviewUrls.push(URL.createObjectURL(file));
      }
    });

    if (newFiles.length > 0) {
      const updatedImages = [...selectedImages, ...newFiles];
      setSelectedImages(updatedImages);
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);

      if (onImagesUploaded) {
        onImagesUploaded(updatedImages);
      }
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
        
        <ImageUploadControls
          onSelectClick={() => fileInputRef.current?.click()}
          onUploadClick={simulateUpload}
          isUploading={isUploading}
          hasSelectedImages={selectedImages.length > 0}
        />
        
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

      <ImagePreviewGrid
        previewUrls={previewUrls}
        onRemoveImage={handleRemoveImage}
        maxImages={maxImages}
      />
    </div>
  );
};

export default ImageUploader;
