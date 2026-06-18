import { useEffect } from "react";
import { Link } from "react-router";
import styles from "./Styles.module.scss";
import { useTranslation } from "react-i18next";
import { authService } from "../../Services/auth.service";
import {
  ensureDeportationTimerForUser,
  getCurrentDeportationUserKey,
  getDeportationDaysLeft,
  getDeportationLimit,
  getDeportationStartDate,
  isDeportationDone,
} from "../../utils/deportationStorage";

function DeportationBanner() {
  const { t } = useTranslation();

  const isAuthenticated = authService.isAuthenticated();
  const userKey = getCurrentDeportationUserKey();
  const startDate = getDeportationStartDate(userKey);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const initializeTimer = (key: string) => {
      const isReEntry = localStorage.getItem(`re_entry_flag_${key}`) === "true";
      ensureDeportationTimerForUser(key, isReEntry);
    };

    if (!userKey) {
      const storedUser = localStorage.getItem("current_user") || localStorage.getItem("username") || "";
      if (storedUser) {
        initializeTimer(storedUser);
      }
      return;
    }

    if (!startDate) {
      initializeTimer(userKey);
    }
  }, [isAuthenticated, userKey, startDate]);

  const hasStarted = !!startDate;
  const canShowBanner = isAuthenticated && hasStarted;

  if (!canShowBanner) {
    return null;
  }

  const isDone = isDeportationDone(userKey);
  const daysLeft = getDeportationDaysLeft(userKey);
  const totalDays = getDeportationLimit(userKey);
  
  const progress = ((totalDays - daysLeft) / totalDays) * 100;

  const isShortTimer = totalDays <= 7;
  const isCritical = isShortTimer ? daysLeft <= 2 : daysLeft <= 7;
  const isWarning = isShortTimer ? daysLeft <= 5 : daysLeft <= 30;

  const urgency =
    isDone ? "done" : isCritical ? "critical" : isWarning ? "warning" : "safe";

  const label = {
    done: t('deportation-banner.done'),
    critical: t('deportation-banner.critical'),
    warning: t('deportation-banner.warning'),
    safe: t('deportation-banner.safe'),
  }[urgency];

  const emoji = { done: "✅", critical: "🚨", warning: "⚠️", safe: "🆗" }[urgency];

  return (
    <Link to="/deportation" className={`${styles.banner} ${styles[urgency]}`}>
      <div className={styles.left}>
        <span className={styles.emoji}>{emoji}</span>
        <div className={styles.text}>
          <span className={styles.label}>{label}</span>
          {!isDone && (
            <span className={styles.sub}>
              {t('deportation-banner.timer')} 
            </span>
          )}
        </div>
      </div>

      <div className={styles.right}>
        {isDone ? (
          <span className={styles.doneText}>{t('deportation-banner.ready')}</span>
        ) : (
          <>
            <span className={styles.days}>{daysLeft}</span>
            <span className={styles.daysLabel}>{t('deportation-banner.days')}</span>
          </>
        )}
      </div>

      {!isDone && (
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      )}
    </Link>
  );
}

export default DeportationBanner;