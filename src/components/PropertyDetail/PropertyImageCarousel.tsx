
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface PropertyImageCarouselProps {
  images: string[];
  title: string;
}

const PropertyImageCarousel = ({ images, title }: PropertyImageCarouselProps) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[300px] md:h-[500px] w-full">
                <img 
                  src={img} 
                  alt={`${title} - Image ${index + 1}`} 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4 gap-4">
          <CarouselPrevious className="relative right-auto" />
          <CarouselNext className="relative left-auto" />
        </div>
      </Carousel>
    </div>
  );
};

export default PropertyImageCarousel;
