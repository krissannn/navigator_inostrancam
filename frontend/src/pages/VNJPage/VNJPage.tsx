import Checklist from "../../components/Checklist/Checklist";
import InfoMap from "../../components/InfoMap/InfoMap";
import InfoPanel from "../../components/InfoPanel/InfoPanel";
import Loading from "../../components/Loading/Loading";
import PageCard from "../../components/PageCard/PageCard";
import ReviewForm, { type ReviewFormData } from "../../Popups/ReviewPopup/ReviewPopup";
import AllStepsCompletePopup from "../../Popups/AllStepsCompletedPopup/AllStepCompletedPopup";
import styles from "./Styles.module.scss";
import docs from "../../assets/docs.svg";
import { useState } from "react";
import ReturnButton from "../../components/ReturnButton/ReturnButton";
import { getUserIdFromToken } from "../../utils/tokenUtils";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import AiAdvice from "../../components/AiAdvice/AiAdvice";
import { useBuildings } from "../../Hooks/useBuildings";
import { useStepArticle } from "../../Hooks/useStepArticle";

const API_URL = import.meta.env.VITE_API_URL;

type PopupState = "none" | "review" | "complete";

function VNJPage() {
  const [popupState, setPopupState] = useState<PopupState>("none");
  const { t } = useTranslation();

  const { info, loading: loadingArticles, localizedContent, localizedChecklist } = useStepArticle(4);
  const { loading: loadingBuildings, stepGeoJSON } = useBuildings(4);

  if (loadingArticles || loadingBuildings || !info) {
    return <Loading />;
  }

  const handleAllCompleted = () => setPopupState("review");

  const handleReviewSubmit = async (data: ReviewFormData) => {
    const body = {
      stress_level: data.stressLevel,
      waiting_time: {
        noQueue: "Без очереди",
        "15min": "15 мин",
        "30min": "30 мин",
        moreThanHour: "Больше часа",
      }[data.queueTime] ?? data.queueTime,
      hours_match: data.scheduleMatch === "yes",
      correct_hours: data.scheduleMatch === "custom" ? data.scheduleCustom : "",
      documents: data.documents,
      user_id: getUserIdFromToken(),
      building_id: 0,
      step_id: 4,
    };

    try {
      await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error("Ошибка отправки отзыва:", err);
    }

    setPopupState("complete");
  };

  return (
    <>
      {popupState === "review" && (
        <ReviewForm
          onSubmit={handleReviewSubmit}
          onClose={() => setPopupState("complete")}
        />
      )}

      {popupState === "complete" && (
        <AllStepsCompletePopup onClose={() => setPopupState("none")} />
      )}

      <ReturnButton />
      <InfoMap zoom={11} features={[stepGeoJSON]}>
        <div className={styles.container__info}>
          <Link to="/step/4/map" className={styles.mapMobileBtn}>
            🗺️ {t("map")}
          </Link>

          <PageCard step_id={info.step_id} title={t("mainPage.step_4")} icon_link={docs} />
          <InfoPanel description={localizedContent} />
          <AiAdvice stepId={4} />

          {localizedChecklist.length > 0 && (
            <Checklist checklist={localizedChecklist} onAllCompleted={handleAllCompleted} />
          )}
        </div>
      </InfoMap>
    </>
  );
}

export default VNJPage;