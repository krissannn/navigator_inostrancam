import InfoMap from "../../components/InfoMap/InfoMap"
import PageCard from "../../components/PageCard/PageCard"
import styles from "./Styles.module.scss"

import BasePage from "../BasePage/BasePage"
import Button from "../../components/UI/Button/Button"
import { useEffect, useState } from "react"
import { steps } from "../../DB/points"
import InfoPanel from "../../components/InfoPanel/InfoPanel"
import { closeGeoJSON, longGeoJSON } from "../../utils/placeGeneration"
import Checklist from "../../components/Checklist/Checklist"

import SuccessPopup from "../../Popups/SuccessPopup/SuccessPopup"
import Loading from "../../components/Loading/Loading"

import plane from "../../assets/plane.svg"

const API_URL = import.meta.env.VITE_API_URL

function PlanePage() {
  const [location, setLocation] = useState<'close'|'far'|null>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  const [info, setInfo] = useState({ content: "", checklist: [] }) 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/steps/0/articles`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setInfo(data[0])
        setLoading(false)
      })
      .catch(error => {
        console.error("Ошибка:", error)
        setLoading(false)
      })
  }, [])
  
  return (
    <>
      {loading && <Loading/>}

      {isVisible && <SuccessPopup to={"/check-in"}/>}

      <BasePage/>
      <InfoMap features={[closeGeoJSON, longGeoJSON]} presets={["islands#blueDotIcon", "islands#redDotIcon"]} zoom={4}>
        <div className={styles.container__info}>
          <PageCard step_id={info.step_id} title={info.title} icon_link={plane} />

          <h3 className={styles.container__subtitle}>Выбери, откуда ты</h3>
          <div className={styles.container__buttons}>
            <Button content="Ближнее зарубежье" onClick={() => setLocation("close")}/>
            <Button content="Дальнее зарубежье" onClick={() => setLocation("far")}/>
          </div>

          {location === "close" && <InfoPanel description={steps[0].description_for_near_abroad}/>}
          {location === "far" && <InfoPanel description={steps[0].description_for_far_abroad}/>}

          <InfoPanel description={info.content} />
          
          <h3 className={styles.container__subtitle}>Чеклист</h3>
          <ul className={styles.container__checklist}>     
            {info.checklist && info.checklist.length > 0 && (
              <Checklist checklist={info.checklist} setIsVisible={setIsVisible}/>
            )}
          </ul>
        </div>
      </InfoMap>
    </>
  )
}

export default PlanePage