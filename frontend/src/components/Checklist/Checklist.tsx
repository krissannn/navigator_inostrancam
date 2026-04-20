import confetti from "canvas-confetti"
import { useEffect, useState } from "react"


type ChecklistPoint = {
  id: number,
  description: string
}

type ChecklistProps = {
  checklist: ChecklistPoint[]
}

function Checklist({checklist}: ChecklistProps){

  const generateChecklist = (checklistPoints: ChecklistPoint[]) => {
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

  const [showFireworks, setShowFireWorks] = useState(false)

  const [checklistPoints, setChecklistPoints] = useState(generateChecklist(checklist))


  const handleToggleCheckbox = (stepId: number) => {
    setChecklistPoints(prev => prev.map(point => point.id === stepId ? {...point, isMarked: !point.isMarked} : {...point}))
  }

  const renderChecklist = () => {
    return checklistPoints.map(s => 
      <li key={s.description}>    
        <input
         type="checkbox"
         checked={s.isMarked}
         onChange={() => handleToggleCheckbox(s.id)}
         />
        <label>{s.description}</label>
      </li>
    )
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
      {renderChecklist()}
    </>
  )
}

export default Checklist