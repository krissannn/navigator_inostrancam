import InfoMap from "../../components/InfoMap/InfoMap";
import PageCard from "../../components/PageCard/PageCard";
import styles from "./Styles.module.scss";
import InfoPanel from "../../components/InfoPanel/InfoPanel";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import SuccessPopup from "../../Popups/SuccessPopup/SuccessPopup";
import Checklist from "../../components/Checklist/Checklist";
import motorcycle from "../../assets/motorcycle.svg";
import { Link, useNavigate } from "react-router";
import { useBuildings } from "../../Hooks/useBuildings";
import ReturnButton from "../../components/ReturnButton/ReturnButton";
import AiAdvice from "../../components/AiAdvice/AiAdvice";
import { useTranslation } from "react-i18next";
import { useStepArticle } from "../../Hooks/useStepArticle";

function InitialCheckInPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const { info, loading: loadingArticles, localizedContent, localizedChecklist } = useStepArticle(1);
  const { loading: loadingBuildings, stepGeoJSON } = useBuildings(1);

  if (loadingArticles || loadingBuildings || !info) {
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
      <InfoMap features={[stepGeoJSON]} zoom={11}>
        <div className={styles.container__info}>
          <Link to="/step/1/map" className={styles.mapMobileBtn}>
            🗺️ {t("map")}
          </Link>

          <PageCard
            step_id={info.step_id}
            title={t("mainPage.step_1")}
            icon_link={motorcycle}
          />

          <InfoPanel description={localizedContent} />  

          <AiAdvice stepId={1} />

          {localizedChecklist.length > 0 && (
            <Checklist checklist={localizedChecklist} setIsVisible={setIsVisible} />  
          )}
        </div>
      </InfoMap>
    </>
  );
}
export default InitialCheckInPage;
