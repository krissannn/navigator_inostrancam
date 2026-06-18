import confetti from "canvas-confetti";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Styles.module.scss";
import type { ChecklistItem } from "../../types";

type ChecklistPoint = ChecklistItem & {
  isMarked: boolean;
};

type ChecklistProps = {
  checklist: ChecklistItem[];
  title?: string;
  onAllCompleted?: () => void;
  setIsVisible?: (value: boolean) => void;
};

function Checklist({
  checklist,
  title,
  onAllCompleted,
  setIsVisible,
}: ChecklistProps) {
  const { t } = useTranslation();
  const hasTriggeredConfetti = useRef(false);

  const [checklistPoints, setChecklistPoints] = useState<ChecklistPoint[]>(() =>
    checklist.map((point) => ({
      ...point,
      isMarked: false,
    }))
  );

  const completedCount = checklistPoints.filter((point) => point.isMarked).length;
  const totalCount = checklistPoints.length;
  const progress = useMemo(
    () => (totalCount > 0 ? (completedCount / totalCount) * 100 : 0),
    [completedCount, totalCount]
  );

  const allChecked =
    checklistPoints.length > 0 &&
    checklistPoints.every((point) => point.isMarked);

  useEffect(() => {
    if (!allChecked) {
      hasTriggeredConfetti.current = false;
      return;
    }

    if (hasTriggeredConfetti.current) return;

    hasTriggeredConfetti.current = true;
    onAllCompleted?.();
    setIsVisible?.(true);

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      startVelocity: 25,
    });
    setTimeout(
      () =>
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0.3, y: 0.5 },
          startVelocity: 20,
        }),
      200
    );
    setTimeout(
      () =>
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0.7, y: 0.5 },
          startVelocity: 20,
        }),
      400
    );
  }, [allChecked, onAllCompleted, setIsVisible]);

  const handleToggleCheckbox = (stepId: number) => {
    setChecklistPoints((prev) =>
      prev.map((point) =>
        point.id === stepId ? { ...point, isMarked: !point.isMarked } : point
      )
    );
  };

  return (
    <div className={styles.checklist}>
      <div className={styles.checklist__header}>
        <h2 className={styles.checklist__title}>
          {title ?? t("checklist.title")}
        </h2>
        <div className={styles.checklist__stats}>
          <span className={styles.checklist__count}>
            {completedCount} / {totalCount}
          </span>
        </div>
      </div>

      <div className={styles.checklist__progress}>
        <div
          className={styles.checklist__progressBar}
          style={{ width: `${progress}%` }}
        />
      </div>

      <ul className={styles.checklist__list}>
        {checklistPoints.map((point, index) => (
          <li
            key={point.id}
            className={`${styles.checklist__item} ${point.isMarked ? styles.checklist__item_completed : ""}`}
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
                {point.isMarked && (
                  <span className={styles.checklist__checkmark}>✓</span>
                )}
              </span>
              <span className={styles.checklist__text}>{point.description}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Checklist;
