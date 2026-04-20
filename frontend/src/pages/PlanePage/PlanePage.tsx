import InfoMap from "../../components/InfoMap/InfoMap"
import PageCard from "../../components/PageCard/PageCard"
import styles from "./Styles.module.scss"

import type { CardDataElement } from "../../DB/cardsData"
import BasePage from "../BasePage"
import Button from "../../components/UI/Button/Button"
import { useEffect, useState } from "react"
import { steps } from "../../DB/points"
import InfoPanel from "../../components/InfoPanel/InfoPanel"
import confetti from "canvas-confetti"




function PlanePage({pageData}: {pageData:  CardDataElement}) {
 
  const [location, setLocation] = useState<'close'|'far'|null>(null)
  const [showFireworks, setShowFireWorks] = useState(false)

  const generateChecklist = (checklistPoints) => {
    return checklistPoints.map((point) => {
      return (
        {
          id: point.id,
          description: point.description,
          isMarked: false
        }
      )
    })
  }

  const [checklistPoints, setChecklistPoints] = useState(generateChecklist(steps[0].checklist))

  const handleToggleCheckbox = (stepId) => {
    setChecklistPoints(prev => prev.map(point => point.id === stepId ? {...point, isMarked: !point.isMarked} : {...point}))
  }

  const renderChecklist = (steps) => {
    return checklistPoints.map((s) => { return (
      <li key={s.description}>    
        <input
         type="checkbox"
         checked={s.isMarked}
         onChange={() => handleToggleCheckbox(s.id)}
         />
        <label>{s.description}</label>
      </li>
    )})
  }

  useEffect(() => {
  console.log('useEffect сработал! checklistPoints изменился')
  
  const allChecked = checklistPoints.length > 0 && 
    checklistPoints.every(point => point.isMarked === true)
  
  if (allChecked && !showFireworks) {
    setShowFireWorks(true)
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 }
    })
    setTimeout(() => setShowFireWorks(false), 2000)
  }
}, [checklistPoints])

  return (
    <>


      <BasePage/>
      <InfoMap>
        <div className={styles.container__info}>
        <PageCard step_id={steps[0].step_id} title={steps[0].title} icon_link={steps[0].icon_link} />

        <h3>Выбери, откуда ты</h3>
        <div className={styles.container__buttons}>
          <Button content="Ближнее зарубежье" onClick={() => setLocation("close")}/>
          <Button content="Дальнее зарубежье"onClick={() => setLocation("far")}/>
        </div>

        {location === "close" && <InfoPanel description={steps[0].description_for_near_abroad}/>}
        {location === "far" && <InfoPanel description={steps[0].description_for_far_abroad}/>}

        <ul className={styles.container__checklist}>     
          {steps[0].checklist && renderChecklist(steps[0].checklist)}
        </ul>

        <InfoPanel description={steps[0].description} />
      </div>
      </InfoMap>
    </>
  )
}

export default PlanePage