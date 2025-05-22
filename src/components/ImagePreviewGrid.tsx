
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface ImagePreviewGridProps {
  previewUrls: string[];
  onRemoveImage: (index: number) => void;
  maxImages: number;
}

const ImagePreviewGrid = ({ previewUrls, onRemoveImage, maxImages }: ImagePreviewGridProps) => {
  if (previewUrls.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <p className="text-sm font-medium mb-2">
        Selected Images ({previewUrls.length}/{maxImages})
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
              onClick={() => onRemoveImage(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImagePreviewGrid;
