import { buildings } from "../DB/buildings";


export const closeGeoJSON = () => {
    return {
      type: "FeatureCollection",
      features: buildings.filter(b => (b.step_id === 0 && b.type === 'close')).map((building) => ({
        type: "Feature",
        id: building.id,
        geometry: {
          type: "Point",
          coordinates: [building.lat, building.lon] 
        },
        properties: {
          name: building.name,
          address: building.address,
          hintContent: building.name,
          balloonContent: `
            <div style="padding: 10px;">
              <strong>${building.name}</strong><br/>
              ${building.address}<br/>
            </div>
          `
        }
      }))
    }
}


export const longGeoJSON = () => {
    return {
      type: "FeatureCollection",
      features: buildings.filter(b => (b.step_id === 0 && b.type === 'long')).map((building) => ({
        type: "Feature",
        id: building.id,
        geometry: {
          type: "Point",
          coordinates: [building.lat, building.lon] 
        },
        properties: {
          name: building.name,
          address: building.address,
          hintContent: building.name,
          balloonContent: `
            <div style="padding: 10px;">
              <strong>${building.name}</strong><br/>
              ${building.address}<br/>
            </div>
          `
        }
      }))
    };
  }


export const mfcGeoJSON = () => {
  return {
      type: "FeatureCollection",
      features: buildings.filter(b => b.type === "mfc").map((building) => ({
        type: "Feature",
        id: building.id,
        geometry: {
          type: "Point",
          coordinates: [building.lat, building.lon] 
        },
        properties: {
          name: building.name,
          address: building.address,
          hintContent: building.name,
          balloonContent: `
            <div style="padding: 10px;">
              <strong>${building.name}</strong><br/>
              ${building.address}<br/>
              ${building.advice}
            </div>
          `
        }
      }))
    };
}


export const bankGeoJSON = () => {
  return {
      type: "FeatureCollection",
      features: buildings.filter(b => b.type === "bank").map((building) => ({
        type: "Feature",
        id: building.id,
        geometry: {
          type: "Point",
          coordinates: [building.lat, building.lon] 
        },
        properties: {
          name: building.name,
          address: building.address,
          hintContent: building.name,
          balloonContent: `
            <div style="padding: 10px;">
              <strong>${building.name}</strong><br/>
              ${building.address}<br/>
              ${building.advice}
            </div>
          `
        }
      }))
    };
}