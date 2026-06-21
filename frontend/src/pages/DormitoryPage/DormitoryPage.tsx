import { useEffect, useState } from "react";
import Checklist from "../../components/Checklist/Checklist";
import InfoPanel from "../../components/InfoPanel/InfoPanel";
import Loading from "../../components/Loading/Loading";
import PageCard from "../../components/PageCard/PageCard";
import SuccessPopup from "../../Popups/SuccessPopup/SuccessPopup";
import styles from './Styles.module.scss'
import InfoMap from "../../components/InfoMap/InfoMap";
import dormitory from "../../assets/dormitory.svg"
import { Link, useNavigate } from "react-router";
import ReturnButton from "../../components/ReturnButton/ReturnButton";
import { t } from "i18next";
import { type InfoCard } from "../../types";
import AiAdvice from "../../components/AiAdvice/AiAdvice";
import { useBuildings } from "../../Hooks/useBuildings";

const API_URL = import.meta.env.VITE_API_URL

function DormitoryPage() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [info, setInfo] = useState<InfoCard | null>(null)  
  const [loading, setLoading] = useState(true)
  const { 
      loading: loadingBuildings, 
      stepGeoJSON 
    } = useBuildings(2);
  
  useEffect(() => {
    fetch(`${API_URL}/steps/2/articles`)
      .then(response => response.json())
      .then(data => {
        setInfo(data[0])
        setLoading(false)
      })
      .catch(error => {
        console.error("Ошибка:", error)
        setLoading(false)
      })
  }, [])

  if (loading || !info || loadingBuildings) {
    return <Loading />
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
            🗺️ {t('map')}
          </Link>
          
          <PageCard step_id={info.step_id} title={t("mainPage.step_2")} icon_link={dormitory} />
          <InfoPanel description={info.content} />

          <AiAdvice stepId={2} /> 

          {info.checklist && info.checklist.length > 0 && (
            <Checklist checklist={info.checklist} setIsVisible={setIsVisible} />
          )}
        </div>
      </InfoMap>
    </>
  )
}

export default DormitoryPage