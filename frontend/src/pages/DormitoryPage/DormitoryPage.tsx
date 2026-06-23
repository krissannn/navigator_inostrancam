import { useState } from "react";
import Checklist from "../../components/Checklist/Checklist";
import InfoPanel from "../../components/InfoPanel/InfoPanel";
import Loading from "../../components/Loading/Loading";
import PageCard from "../../components/PageCard/PageCard";
import SuccessPopup from "../../Popups/SuccessPopup/SuccessPopup";
import styles from './Styles.module.scss';
import InfoMap from "../../components/InfoMap/InfoMap";
import dormitory from "../../assets/dormitory.svg";
import { Link, useNavigate } from "react-router";
import ReturnButton from "../../components/ReturnButton/ReturnButton";
import { useTranslation } from "react-i18next";
import AiAdvice from "../../components/AiAdvice/AiAdvice";
import { useBuildings } from "../../Hooks/useBuildings";
import { useStepArticle } from "../../Hooks/useStepArticle";

function DormitoryPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const { info, loading: loadingArticles, localizedContent, localizedChecklist } = useStepArticle(2);
  const { loading: loadingBuildings, stepGeoJSON } = useBuildings(2);

  if (loadingArticles || loadingBuildings || !info) {
    return <Loading />;
  }

  return (
    <>
      {isVisible && (
        <SuccessPopup
          onNext={() => navigate("/long-registration")}
          onClose={() => setIsVisible(prev => !prev)}
        />
      )}

      <ReturnButton />
      <InfoMap zoom={11} features={[stepGeoJSON]}>
        <div className={styles.container__info}>
          <Link to="/step/2/map" className={styles.mapMobileBtn}>
            🗺️ {t("map")}
          </Link>

          <PageCard step_id={info.step_id} title={t("mainPage.step_2")} icon_link={dormitory} />
          <InfoPanel description={localizedContent} />

          <AiAdvice stepId={2} />

          {localizedChecklist.length > 0 && (
            <Checklist checklist={localizedChecklist} setIsVisible={setIsVisible} />
          )}
        </div>
      </InfoMap>
    </>
  );
}

export default DormitoryPage;