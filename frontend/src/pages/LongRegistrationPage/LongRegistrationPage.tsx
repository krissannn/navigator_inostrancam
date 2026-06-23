import Checklist from "../../components/Checklist/Checklist"
import InfoMap from "../../components/InfoMap/InfoMap"
import InfoPanel from "../../components/InfoPanel/InfoPanel"
import Loading from "../../components/Loading/Loading"
import PageCard from "../../components/PageCard/PageCard"
import SuccessPopup from "../../Popups/SuccessPopup/SuccessPopup"
import docs from "../../assets/docs.svg"
import { useState } from "react"
import styles from "./Styles.module.scss"
import ReturnButton from "../../components/ReturnButton/ReturnButton"
import { Link, useNavigate } from "react-router"
import { useTranslation } from "react-i18next"  
import AiAdvice from "../../components/AiAdvice/AiAdvice"
import { useBuildings } from "../../Hooks/useBuildings"
import { useStepArticle } from "../../Hooks/useStepArticle"

function InitialRegistrationPage() {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { info, loading: loadingArticles, localizedContent, localizedChecklist } = useStepArticle(3)
  const { loading: loadingBuildings, stepGeoJSON } = useBuildings(3)

  if (loadingArticles || loadingBuildings || !info) {
    return <Loading />
  }

  return (
    <>
      {isVisible && (
        <SuccessPopup
          onNext={() => navigate("/vnj")}
          onClose={() => setIsVisible(prev => !prev)}
        />
      )}

      <ReturnButton />
      <InfoMap zoom={11} features={[stepGeoJSON]}>
        <div className={styles.container__info}>
          <Link to="/step/3/map" className={styles.mapMobileBtn}>
            🗺️ {t("map")}
          </Link>

          <PageCard step_id={info.step_id} title={t("mainPage.step_3")} icon_link={docs} />
          <InfoPanel description={localizedContent} />

          <AiAdvice stepId={3} />

          {localizedChecklist.length > 0 && (
            <Checklist checklist={localizedChecklist} setIsVisible={setIsVisible} />
          )}
        </div>
      </InfoMap>
    </>
  )
}

export default InitialRegistrationPage