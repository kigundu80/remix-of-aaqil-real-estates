import luxuryVilla from './luxury-villa.jpg';
import downtownApartment from './downtown-apartment.jpg';
import agriculturalLand from './agricultural-land.jpg';
import toyotaLandcruiser from './toyota-landcruiser.jpg';
import mercedesCclass from './mercedes-cclass.jpg';
import officeDesk from './office-desk.jpg';
import leatherSofa from './leather-sofa.jpg';

// Map property IDs to their images
export const propertyImages: Record<string, string> = {
  '3139157b-4993-401e-84a0-ca05d202eba3': luxuryVilla,       // Modern Luxury Villa
  '10fb5335-ce5e-4089-a860-7e8b0174f245': downtownApartment, // Downtown Apartment
  'f401a1c6-6b4c-4f18-b25d-91f4b94732a0': agriculturalLand,  // Prime Agricultural Land
  '98be5f78-4433-410c-9d12-d12b8ba6df76': toyotaLandcruiser, // Toyota Land Cruiser V8
  '88b1a8f9-34f8-4e1e-9411-17b28f07c60c': mercedesCclass,    // Mercedes-Benz C-Class
  '02142da1-0644-4bf4-acbf-e87ce71ed2e0': officeDesk,        // Executive Office Desk
  'a938ed9d-2bdd-4018-8244-441518e6a4e8': leatherSofa,       // L-Shaped Leather Sofa
};

// Default images by category
export const categoryDefaultImages: Record<string, string> = {
  house: luxuryVilla,
  land: agriculturalLand,
  vehicle: toyotaLandcruiser,
  furniture: leatherSofa,
};

export const getPropertyImage = (propertyId: string, category?: string): string => {
  // First check if we have a specific image for this property
  if (propertyImages[propertyId]) {
    return propertyImages[propertyId];
  }
  
  // Fall back to category default
  if (category && categoryDefaultImages[category]) {
    return categoryDefaultImages[category];
  }
  
  // Ultimate fallback
  return luxuryVilla;
};

export {
  luxuryVilla,
  downtownApartment,
  agriculturalLand,
  toyotaLandcruiser,
  mercedesCclass,
  officeDesk,
  leatherSofa,
};
