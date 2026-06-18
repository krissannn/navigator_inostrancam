import InfoMap from "../../components/InfoMap/InfoMap";
import PageCard from "../../components/PageCard/PageCard";
import styles from "./Styles.module.scss";
import InfoPanel from "../../components/InfoPanel/InfoPanel";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import SuccessPopup from "../../Popups/SuccessPopup/SuccessPopup";
import Checklist from "../../components/Checklist/Checklist";
import motorcycle from "../../assets/motorcycle.svg";
import { Link, useNavigate } from "react-router";
import { useBuildings } from "../../Hooks/useBuildings";
import ReturnButton from "../../components/ReturnButton/ReturnButton";
import AiAdvice from "../../components/AiAdvice/AiAdvice";
import { useTranslation } from "react-i18next";
import type { Building, GeoJSONFeatureCollection, InfoCard } from "../../types";
import { getLocalizedArticleContent } from "../../utils/localizedContent";

const API_URL = import.meta.env.VITE_API_URL;

function InitialCheckInPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [info, setInfo] = useState<InfoCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/steps/1/articles`)
      .then((response) => response.json())
      .then((data: InfoCard[]) => {
        setInfo(data[0] ?? null);
        setLoading(false);
      })
      .catch((error: unknown) => {
        console.error("Failed to load articles:", error);
        setLoading(false);
      });
  }, []);

  const { allBuildings, loading: loadingBuildings } = useBuildings();

  const getAllBuildingsGeoJSON = (): GeoJSONFeatureCollection => ({
    type: "FeatureCollection",
    features: allBuildings.map((building: Building) => ({
      type: "Feature",
      id: building.id,
      geometry: {
        type: "Point",
        coordinates: [building.lon, building.lat],
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
    })),
  });

  if (loading || loadingBuildings || !info) {
    return <Loading />;
  }

  return (
    <>
      {isVisible && (
        <SuccessPopup
          onNext={() => navigate("/dorm")}
          onClose={() => setIsVisible((prev) => !prev)}
        />
      )}

      <ReturnButton />
      <InfoMap
        features={[getAllBuildingsGeoJSON]}
        presets={["islands#purpleDotIcon", "islands#greenMoneyIcon"]}
        zoom={11}
      >
        <div className={styles.container__info}>
          <Link to="/plane/map" className={styles.mapMobileBtn}>
            🗺️ {t("map")}
          </Link>

          <PageCard
            step_id={info.step_id}
            title={info.title}
            icon_link={motorcycle}
          />
          <InfoPanel
            description={getLocalizedArticleContent(info, i18n.language)}
          />

          <AiAdvice stepId={1} />

          {info.checklist.length > 0 && (
            <Checklist checklist={info.checklist} setIsVisible={setIsVisible} />
          )}
        </div>
      </InfoMap>
    </>
  );
}

export default InitialCheckInPage;
