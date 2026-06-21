import { YMaps, Map, ObjectManager } from "@pbe/react-yandex-maps";
import { useParams } from "react-router";
import styles from "./Styles.module.scss";
import { useBuildings } from "../../Hooks/useBuildings";
import Loading from "../../components/Loading/Loading";



function UniversalMapPage() {
  const { stepId } = useParams<{ stepId: string }>();
  
  const currentStepId = Number(stepId) || 0;

  const { stepGeoJSON, loading } = useBuildings(currentStepId);

  if (loading) return <Loading />;

  const mapState = currentStepId === 0 
    ? { center: [55.755864, 37.617698], zoom: 4 }   
    : { center: [56.838926, 60.605702], zoom: 12 }; 

  return (
    <div className={styles.mapPageWrapper}>
      <YMaps query={{ apikey: import.meta.env.VITE_API_KEY, load: "package.full" }}>
        <Map
          className={styles.map}
          defaultState={mapState}
          state={mapState}
        >
          <ObjectManager
            features={stepGeoJSON}
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
        </Map>
      </YMaps>
    </div>
  );
}

export default UniversalMapPage;