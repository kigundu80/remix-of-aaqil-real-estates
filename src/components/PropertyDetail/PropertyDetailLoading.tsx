
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PropertyDetailLoading = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="animate-pulse space-y-6 w-full max-w-5xl">
          <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetailLoading;
