/**
 * Types representing high-fashion clothing items, fabrics, locations, and booking states.
 */

export interface GarmetItem {
  id: string;
  title: string;
  collection: string;
  price: string;
  fabric: string;
  composition: string;
  description: string;
  imageUrl: string;
  details: string[];
  attributes: {
    origin: string;
    weight: string;
    care: string;
  };
}

export interface BoutiqueLocation {
  id: string;
  city: string;
  address: string;
  ateliers: string[];
  phone: string;
  coordinates: string;
}

export interface MaterialOption {
  id: string;
  name: string;
  type: string;
  description: string;
  priceIncrease: string;
  hexColor: string;
  weight: string;
  sustainabilityRating: number;
}

export interface CustomGarmentConfig {
  silhouetteId: string;
  materialId: string;
  accentColor: string;
  monogram: string;
}
