import { useState } from "react";
import styles from "./Styles.module.scss";
import { Link } from "react-router";
 
function SuccessPopup({to}: {to: string}) {
  const [visible, setVisible] = useState(true);
 
  if (!visible) return null;
 
  return (
    <div className={styles.popup_overlay}>
      <div className={styles.popup}>
        <button className={styles.popup__close} onClick={() => setVisible(false)}>
          ×
        </button>
 
        <div className={styles.popup__icon_wrapper}>
          <div className={styles.popup__icon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
              <polyline points="8 12 11 15 16 9" />
            </svg>
          </div>
          <span className={styles.popup__sparkle}>✦</span>
        </div>
 
        <h2 className={styles.popup__title}>Поздравляем!</h2>
        <p className={styles.popup__subtitle}>Вы успешно завершили этот шаг</p>
 
        <div className={styles.popup__badge}>
          Шаг завершён ✓
        </div>
 
        <Link to={to}>
          <button className={styles.popup__cta}>
            Перейти к следующему шагу →
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SuccessPopup