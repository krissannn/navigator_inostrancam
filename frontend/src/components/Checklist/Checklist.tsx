import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import styles from "./Styles.module.scss"; 

type ChecklistPoint = {
  id: number;
  description: string;
};

type ChecklistProps = {
  checklist: ChecklistPoint[];
  title?: string; 
  setIsVisible: (value: boolean) => void
};

function Checklist({ checklist, title = "Мои задачи", setIsVisible }: ChecklistProps) {
  const [showFireworks, setShowFireworks] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const [checklistPoints, setChecklistPoints] = useState(
    checklist.map((point) => ({
      id: point.id,
      description: point.description,
      isMarked: false,
    }))
  );

  const handleToggleCheckbox = (stepId: number) => {
    setChecklistPoints((prev) =>
      prev.map((point) =>
        point.id === stepId ? { ...point, isMarked: !point.isMarked } : point
      )
    );
  };

  // Подсчет прогресса
  useEffect(() => {
    const completedCount = checklistPoints.filter(point => point.isMarked).length;
    const totalCount = checklistPoints.length;
    const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    setProgress(progressPercent);
  }, [checklistPoints]);

  // Запуск конфетти при выполнении всех задач
  useEffect(() => {
    const allChecked = checklistPoints.length > 0 && 
      checklistPoints.every((point) => point.isMarked === true);

    if (allChecked && !showFireworks) {
      setShowFireworks(true);
      setIsVisible(true)
      

      confetti({
        particleCount: 150,  
        spread: 100,          
        origin: { x: 0.5, y: 0.5 }, 
        startVelocity: 25,   
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0.3, y: 0.5 },
          startVelocity: 20,
        });
      }, 200);
      
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0.7, y: 0.5 },
          startVelocity: 20,
        });
      }, 400);
      
      setTimeout(() => setShowFireworks(false), 3000);
    }
  }, [checklistPoints, showFireworks]);

  const completedCount = checklistPoints.filter(point => point.isMarked).length;
  const totalCount = checklistPoints.length;

  return (
    <div className={styles.checklist}>
      <div className={styles.checklist__header}>
        <h2 className={styles.checklist__title}>{title}</h2>
        <div className={styles.checklist__stats}>
          <span className={styles.checklist__count}>
            {completedCount} / {totalCount}
          </span>
        </div>
      </div>

      {/* Прогресс-бар */}
      <div className={styles.checklist__progress}>
        <div 
          className={styles.checklist__progressBar} 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Список задач */}
      <ul className={styles.checklist__list}>
        {checklistPoints.map((point, index) => (
          <li 
            key={point.id} 
            className={`${styles.checklist__item} ${point.isMarked ? styles.checklist__item_completed : ''}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <label className={styles.checklist__label}>
              <input
                type="checkbox"
                checked={point.isMarked}
                onChange={() => handleToggleCheckbox(point.id)}
                className={styles.checklist__checkbox}
              />
              <span className={styles.checklist__checkboxCustom}>
                {point.isMarked && <span className={styles.checklist__checkmark}>✓</span>}
              </span>
              <span className={styles.checklist__text}>
                {point.description}
              </span>
            </label>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Checklist;