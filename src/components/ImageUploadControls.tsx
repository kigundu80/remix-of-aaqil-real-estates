
import { Button } from "@/components/ui/button";
import { Image, Upload, Loader2 } from "lucide-react";

interface ImageUploadControlsProps {
  onSelectClick: () => void;
  onUploadClick: () => void;
  isUploading: boolean;
  hasSelectedImages: boolean;
}

const ImageUploadControls = ({
  onSelectClick,
  onUploadClick,
  isUploading,
  hasSelectedImages
}: ImageUploadControlsProps) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={onSelectClick}
        disabled={isUploading}
        className="flex-1"
      >
        <Image className="h-4 w-4 mr-2" />
        Select Images
      </Button>
      <Button
        type="button"
        onClick={onUploadClick}
        disabled={isUploading || !hasSelectedImages}
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
  );
};

export default ImageUploadControls;
