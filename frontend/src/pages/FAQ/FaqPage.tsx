import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import SuccessPopup from "../../Popups/SuccessPopup/SuccessPopup";
import InfoMap from "../../components/InfoMap/InfoMap";
import PageCard from "../../components/PageCard/PageCard";
import InfoPanel from "../../components/InfoPanel/InfoPanel";
import Checklist from "../../components/Checklist/Checklist";
import faq from "../../assets/faq.svg";
import styles from "./Styles.module.scss";
import { Link, useNavigate } from "react-router";
import ReturnButton from "../../components/ReturnButton/ReturnButton";
import { useTranslation } from "react-i18next";
import { useBuildings } from "../../Hooks/useBuildings";
import { useStepArticle } from "../../Hooks/useStepArticle";

function FaqPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const { info, loading: loadingArticles, localizedContent, localizedChecklist } = useStepArticle(5);
  const { loading: loadingBuildings, stepGeoJSON } = useBuildings(5);

  if (loadingArticles || loadingBuildings || !info) {
    return <Loading />;
  }

  return (
    <>
      {isVisible && (
        <SuccessPopup
          onNext={() => navigate("/")}
          onClose={() => setIsVisible(prev => !prev)}
        />
      )}

      <ReturnButton />
      <InfoMap zoom={11} features={[stepGeoJSON]}>
        <div className={styles.container__info}>
          <Link to="/step/5/map" className={styles.mapMobileBtn}>
            🗺️ {t("map")}
          </Link>

          <PageCard step_id={info.step_id} title={t("mainPage.step_5")} icon_link={faq} />
          <InfoPanel description={localizedContent} />

          {localizedChecklist.length > 0 && (
            <Checklist checklist={localizedChecklist} setIsVisible={setIsVisible} />
          )}
        </div>
      </InfoMap>
    </>
  );
}

export default FaqPage;