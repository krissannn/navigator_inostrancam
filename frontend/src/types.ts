export type ChecklistItem = {
  id: number;
  description: string;
};

export type InfoCard = {
  id: number;
  title: string;
  content: string;
  content_en: string;
  content_zh?: string;
  order: number;
  checklist: ChecklistItem[];
  step_id: number;
};

export type Building = {
  id: number;
  name: string;
  address: string;
  description: string;
  lat: number;
  lon: number;
  type?: string;
  step_id?: number;
};

export type GeoJSONFeatureCollection = {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
};

export type GeoJSONFeature = {
  type: "Feature";
  id: number;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: {
    name: string;
    address: string;
    hintContent: string;
    balloonContent: string;
  };
};

export type SupportedLanguage = "ru" | "en" | "zh";
