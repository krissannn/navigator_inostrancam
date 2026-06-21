import { useEffect, useState } from 'react';
import type { Building, GeoJSONFeatureCollection } from '../types';


const API_URL = import.meta.env.VITE_API_URL;

const YANDEX_PRESETS: Record<string, string> = {
  airport: "islands#blueAirportIcon",
  border_crossing: "islands#grayMassTransitIcon",
  exchange_office: "islands#orangeMoneyIcon",
  dorm: "islands#greenHomeIcon",
  institute: "islands#orangeEducationIcon",
  admin: "islands#blueGovernmentIcon",
  health: "islands#redMedicalIcon",
  test_center: "islands#orangeEducationIcon",
  mvd: "islands#redGovernmentIcon",
  food: "islands#darkOrangeFoodIcon",
  culture: "islands#greenTheaterIcon",
  transport: "islands#darkBlueMassTransitIcon",
  shop: "islands#grayShoppingIcon",
  service: "islands#pinkCircleIcon",
  pharmacy: "islands#darkRedMedicalIcon",
  sport: "islands#blueSportIcon",
  bank: "islands#greenMoneyIcon",
  sim_store: "islands#yellowCircleIcon",
  mfc: "islands#violetGovernmentIcon",
};

function buildingToFeature(building: Building) {
  const presetStyle = YANDEX_PRESETS[building.building_type] || "islands#blueDotIcon"; 
  
  return {
    type: "Feature" as const,
    id: building.id,
    geometry: {
      type: "Point" as const,
      coordinates: [building.lat, building.lon] as [number, number],
    },
    properties: {
      name: building.name,
      address: building.address,
      hintContent: building.name,
      balloonContent: `
        <div style="padding: 10px; font-family: sans-serif; min-width: 200px;">
          <strong style="color: #1e4391; font-size: 14px;">${building.name}</strong><br/>
          <span style="color: #222; font-size: 13px; display: inline-block; margin-top: 4px;">📍 ${building.address}</span><br/>
          ${building.description ? `<small style="color: #666; display: inline-block; margin-top: 6px; line-height: 1.3;">${building.description}</small>` : ''}
        </div>
      `,
    },

    options: {
      preset: presetStyle
    }
  };
}

function toFeatureCollection(buildings: Building[]): GeoJSONFeatureCollection {
  return {
    type: "FeatureCollection",
    features: buildings.map(buildingToFeature),
  };
}

export const useBuildings = (stepId: number) => {
  const [allBuildings, setAllBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/buildings`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch buildings');
        return res.json();
      })
      .then(data => {
        setAllBuildings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка загрузки зданий:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);


  const stepBuildings = allBuildings.filter(b => b.step_id === stepId);

  return {
    loading,
    error,
    allBuildings, 
    stepGeoJSON: toFeatureCollection(stepBuildings)
  };
};
