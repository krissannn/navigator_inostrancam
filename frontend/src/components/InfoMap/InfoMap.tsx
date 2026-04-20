import { YMaps, Map, ObjectManager } from "@pbe/react-yandex-maps";
import styles from "./Styles.module.scss"
import { steps } from "../../DB/points"
import {buildings} from '../../DB/buildings'
import { useMemo, useState } from "react";
import PageCard from "../PageCard/PageCard";
import InfoPanel from "../InfoPanel/InfoPanel";
import Button from "../UI/Button/Button";

function InfoMap({children}) {


  const [location, setLocation] = useState<'close'|'far'|null>(null)

  // Конвертируем данные в GeoJSON для ObjectManager
  const closeGeoJSON = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: buildings.filter(b => b.type === 'close').map((building) => ({
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
  }, [buildings]);

  const longGeoJSON = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: buildings.filter(b => b.type === 'long').map((building) => ({
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
  }, [buildings]);


  



  return (
    <div className={styles.container}>

      {children}
    
    <div className={styles.container__map}>

     <YMaps query={{apikey: 'f5de1e25-512f-402a-bf49-db416eec9584', load: 'package.full'}}>
        <Map 
          className={styles.map} 
          defaultState={{center: [56.744167, 60.802778], zoom: 4}}
        >
          <ObjectManager features={closeGeoJSON}
            options={{
              clusterize: false
            }}
            objects={{
              preset: "islands#blueDotIcon",
              openBalloonOnClick: true
            }}
          />
          <ObjectManager features={longGeoJSON}
            options={{
              clusterize: false
            }}
            objects={{
              preset: "islands#redDotIcon",
              openBalloonOnClick: true
            }}
          />
        </Map>
      </YMaps>
    </div>
    </div>
  )
}

export default InfoMap;