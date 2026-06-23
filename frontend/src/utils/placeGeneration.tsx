import type { Building, GeoJSONFeatureCollection } from "../types";

function buildingToFeature(building: Building) {
  return {
    type: "Feature" as const,
    id: building.id,
    geometry: {
      type: "Point" as const,
      coordinates: [building.lon, building.lat] as [number, number],
    },
    properties: {
      name: building.name,
      address: building.address,
      hintContent: building.name,
      balloonContent: `
          <div style="padding: 10px;">
            <strong>${building.name}</strong><br/>
            ${building.address}<br/>
            <small>${building.description}</small>
          </div>
        `,
    },
  };
}

function toFeatureCollection(buildings: Building[]): GeoJSONFeatureCollection {
  return {
    type: "FeatureCollection",
    features: buildings.map(buildingToFeature),
  };
}

export const convertToGeoJSON = (buildings: Building[]) =>
  toFeatureCollection(buildings);


