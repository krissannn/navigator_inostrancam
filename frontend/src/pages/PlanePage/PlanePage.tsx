import InfoMap from "../../components/InfoMap/InfoMap"
import PageCard from "../../components/PageCard/PageCard"
import styles from "./Styles.module.scss"

import type { CardDataElement } from "../../DB/cardsData"
import BasePage from "../BasePage/BasePage"
import Button from "../../components/UI/Button/Button"
import { useState } from "react"
import { steps } from "../../DB/points"
import InfoPanel from "../../components/InfoPanel/InfoPanel"
import { closeGeoJSON, longGeoJSON } from "../../utils/placeGeneration"
import Checklist from "../../components/Checklist/Checklist"

import SuccessPopup from "../../Popups/SuccessPopup/SuccessPopup"



function PlanePage({pageData}: {pageData:  CardDataElement}) {
 
  const [location, setLocation] = useState<'close'|'far'|null>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  return (
    <>
      {isVisible && <SuccessPopup />}

      <BasePage/>
      <InfoMap features={[closeGeoJSON, longGeoJSON]} presets={["islands#blueDotIcon", "islands#redDotIcon"]} zoom={4}>
        <div className={styles.container__info}>
        <PageCard step_id={steps[0].step_id} title={steps[0].title} icon_link={steps[0].icon_link} />

        <h3 className={styles.container__subtitle}>Выбери, откуда ты</h3>
        <div className={styles.container__buttons}>
          <Button content="Ближнее зарубежье" onClick={() => setLocation("close")}/>
          <Button content="Дальнее зарубежье"onClick={() => setLocation("far")}/>
        </div>

        {location === "close" && <InfoPanel description={steps[0].description_for_near_abroad}/>}
        {location === "far" && <InfoPanel description={steps[0].description_for_far_abroad}/>}


        <InfoPanel description={steps[0].description} />
        <h3 className={styles.container__subtitle}>Чеклист</h3>
        <ul className={styles.container__checklist}>     
          <Checklist checklist={steps[0].checklist} setIsVisible={setIsVisible}/>
        </ul>
      </div>
      </InfoMap>
    </>
  )
}

export default PlanePage