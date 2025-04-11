
interface PropertyLocationProps {
  latitude?: number;
  longitude?: number;
}

const PropertyLocation = ({ latitude, longitude }: PropertyLocationProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Location</h2>
      <div className="rounded-lg overflow-hidden h-64 bg-gray-200 flex items-center justify-center">
        {latitude && longitude ? (
          <p className="text-gray-600">Map coordinates: {latitude}, {longitude}</p>
        ) : (
          <p className="text-gray-600">Google Map would appear here</p>
        )}
      </div>
    </div>
  );
};

export default PropertyLocation;
