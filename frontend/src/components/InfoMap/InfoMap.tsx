import { YMaps, Map, ObjectManager } from "@pbe/react-yandex-maps";
import { type ReactNode } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import type { GeoJSONFeatureCollection } from "../../types";
import styles from "./Styles.module.scss";

type InfoMapProps = {
  features?: GeoJSONFeatureCollection[];
  zoom: number;
  children: ReactNode;
  mapRoute?: string;
};

function InfoMap({
  features,
  zoom,
  children,
  mapRoute,
}: InfoMapProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {children}

      {mapRoute && (
        <Link to={mapRoute} className={styles.mapMobileBtn}>
          🗺️ {t("map")}
        </Link>
      )}

      <div className={styles.container__map}>
        <YMaps
          query={{
            apikey: import.meta.env.VITE_API_KEY,
            load: "package.full",
          }}
        >
          <Map
            className={styles.map}
            defaultState={{
              center: [56.837435, 60.597636],
              zoom,
            }}
          >
            {features?.map((geoJsonData, index) => (
              <ObjectManager
                key={index}
                features={geoJsonData}
                options={{ clusterize: false }}
                objects={{
                  openBalloonOnClick: true,
                  preset: "islands#blueDotIcon", 
                  processEachObject: (obj: any) => {
                    if (obj.options) {
                      obj.options = { ...obj.options };
                    }
                    return obj;
                  }
                }}
              />
            ))}
          </Map>
        </YMaps>
      </div>
    </div>
  );
}

export default InfoMap;