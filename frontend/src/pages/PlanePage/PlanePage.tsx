import InfoMap from "../../components/InfoMap/InfoMap";
import PageCard from "../../components/PageCard/PageCard";
import styles from "./Styles.module.scss";
import Button from "../../components/UI/Button/Button";
import { useEffect, useState } from "react";
import { steps } from "../../DB/points";
import InfoPanel from "../../components/InfoPanel/InfoPanel";
import Checklist from "../../components/Checklist/Checklist";
import SuccessPopup from "../../Popups/SuccessPopup/SuccessPopup";
import Loading from "../../components/Loading/Loading";
import plane from "../../assets/plane.svg";
import { Link, useNavigate } from "react-router";
import { useBuildings } from "../../Hooks/useBuildings";
import ReturnButton from "../../components/ReturnButton/ReturnButton";
import { useTranslation } from "react-i18next";
import type { InfoCard } from "../../types";
import AiAdvice from "../../components/AiAdvice/AiAdvice";
import { getLocalizedArticleContent } from "../../utils/localizedContent";
import type { Building, GeoJSONFeatureCollection } from "../../types";

const API_URL = import.meta.env.VITE_API_URL;

function PlanePage() {
  const [location, setLocation] = useState<"close" | "far" | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [info, setInfo] = useState<InfoCard>();
  const [loadingArticles, setLoadingArticles] = useState(true);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch(`${API_URL}/steps/0/articles`)
      .then((response) => response.json())
      .then((data: InfoCard[]) => {
        setInfo(data[0]);
        setLoadingArticles(false);
      })
      .catch((error: unknown) => {
        console.error("Failed to load articles:", error);
        setLoadingArticles(false);
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

  if (loadingArticles || loadingBuildings) {
    return <Loading />;
  }

  return (
    <>
      {isVisible && (
        <SuccessPopup
          onNext={() => navigate("/check-in")}
          onClose={() => setIsVisible((prev) => !prev)}
        />
      )}

      <ReturnButton />

      <InfoMap
        features={[getAllBuildingsGeoJSON]}
        presets={["islands#blueDotIcon"]}
        zoom={4}
      >
        <div className={styles.container__info}>
          <Link to="/plane/map" className={styles.mapMobileBtn}>
            🗺️ {t("map")}
          </Link>

          <PageCard step_id={1} title={info?.title} icon_link={plane} />

          <h3 className={styles.container__subtitle}>
            {t("plane-page.originTitle")}
          </h3>
          <div className={styles.container__buttons}>
            <Button
              content={t("plane-page.nearAbroad")}
              onClick={() => setLocation("close")}
            />
            <Button
              content={t("plane-page.farAbroad")}
              onClick={() => setLocation("far")}
            />
          </div>

          {location === "close" && 
            <InfoPanel description={t("plane-page.description_for_near_abroad")} /> 
          }
          {location === "far" && (
            <InfoPanel description={t("plane-page.description_for_far_abroad")} />
          )}

          <InfoPanel
            description={getLocalizedArticleContent(info, i18n.language)}
          />

          <AiAdvice stepId={0} />

          <h3 className={styles.container__subtitle}>{t("common.checklist")}</h3>
          <ul className={styles.container__checklist}>
            {info?.checklist && info.checklist.length > 0 && (
              <Checklist checklist={info.checklist} setIsVisible={setIsVisible} />
            )}
          </ul>
        </div>
      </InfoMap>
    </>
  );
}

export default PlanePage;
