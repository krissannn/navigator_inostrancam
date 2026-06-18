import { useEffect, useState, useCallback } from "react";
import styles from "./Styles.module.scss";
import { useTranslation } from "react-i18next";
import i18n from "../../i18";
import RegistrationPopup from "../../Popups/RegistrationPopup/RegistrationPopup";
import {
  getDeportationLimit,
  getCurrentDeportationUserKey,
  getDeportationDaysLeft,
  getDeportationStartDate,
  isDeportationDone,
  resetDeportationTimer,
  setDeportationDone,
  setReEntryFlag,
  ensureDeportationTimerForUser,
} from "../../utils/deportationStorage";

function getNotificationMessage(daysLeft: number): string {
  if (daysLeft <= 0) return i18n.t("deportation-page.msg-less-0");
  if (daysLeft <= 7) {
    return i18n.t("deportation-page.msg-less-7", { daysLeft });
  }
  if (daysLeft <= 14) {
    return i18n.t("deportation-page.msg-less-14", { daysLeft });
  }
  if (daysLeft <= 30) {
    return i18n.t("deportation-page.msg-less-30", { daysLeft });
  }
  return i18n.t("deportation-page.msg", { daysLeft });
}

function sendNotification(daysLeft: number) {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  new Notification(i18n.t("deportation-page.notification"), {
    body: getNotificationMessage(daysLeft),
    icon: "/favicon.ico",
  });
}

function DeportationTimerPage() {
  const { t, i18n: i18nInstance } = useTranslation();
  const currentUserKey = getCurrentDeportationUserKey();
  
  const totalDays = getDeportationLimit(currentUserKey);
  const [startDate, setStartDate] = useState<Date | null>(() => getDeportationStartDate(currentUserKey));
  const [daysLeft, setDaysLeft] = useState<number>(() =>
    getDeportationDaysLeft(currentUserKey)
  );
  const [isDone, setIsDone] = useState<boolean>(() =>
    isDeportationDone(currentUserKey)
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const [notifGranted, setNotifGranted] = useState(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return false;
    }
    return Notification.permission === "granted";
  });
  const [notificationStatus, setNotificationStatus] = useState<string | null>(
    null
  );

  const dateLocale =
    i18nInstance.language === "ru"
      ? "ru-RU"
      : i18nInstance.language === "zh"
        ? "zh-CN"
        : "en-US";

  useEffect(() => {
    if (isDone || !startDate) return;
    const interval = setInterval(() => {
      setDaysLeft(getDeportationDaysLeft(currentUserKey));
    }, 60_000);
    return () => clearInterval(interval);
  }, [currentUserKey, isDone, startDate]);

  useEffect(() => {
    if (isDone) return;
    if (Notification.permission === "granted") {
      sendNotification(daysLeft);
    }
  }, [isDone, daysLeft]);

  const handleRequestNotif = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      setNotificationStatus(t("deportation-page.notifications-unavailable"));
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setNotifGranted(true);
        setNotificationStatus(null);
        sendNotification(daysLeft);
        return;
      }

      setNotifGranted(false);
      setNotificationStatus(t("deportation-page.notifications-denied"));
    } catch {
      setNotificationStatus(t("deportation-page.notifications-unavailable"));
    }
  }, [daysLeft, t]);
  const handleDone = () => {
  setDeportationDone(currentUserKey, true);
  setReEntryFlag(currentUserKey, true);
  
  setIsDone(true);
  setShowConfirm(false);
};


useEffect(() => {
  if (!startDate && currentUserKey) {
    const isReEntry = localStorage.getItem(`re_entry_flag_${currentUserKey}`) === "true";
    ensureDeportationTimerForUser(currentUserKey, isReEntry);
    const newStartDate = getDeportationStartDate(currentUserKey);
    setStartDate(newStartDate);
    setDaysLeft(getDeportationDaysLeft(currentUserKey));
  }
}, [startDate, currentUserKey]);

  const handleReset = () => {
  resetDeportationTimer(currentUserKey);
  setIsDone(false);
  setDaysLeft(90);
  setStartDate(null);
  setShowConfirm(false);
};

  const progress = isDone ? 100 : ((totalDays - daysLeft) / totalDays) * 100;

  const isShortTimer = totalDays <= 7;
  const isCritical = isShortTimer ? daysLeft <= 2 : daysLeft <= 7;
  const isWarning = isShortTimer ? daysLeft <= 5 : daysLeft <= 30;

  const urgencyClass = isDone
    ? styles.safe
    : isCritical
      ? styles.critical
      : isWarning
        ? styles.warning
        : styles.safe;

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = isDone
    ? 0
    : circumference - (progress / 100) * circumference;

  if (!startDate) {
    return (
      <div className={styles.page}>
        <div className={styles.content}>
          <h1 className={styles.title}>{t("deportation-page.staying")}</h1>
          <p className={styles.subtitle}>
            {t("deportation-page.need-registration", "Complete registration to activate the countdown.")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`${styles.page} ${urgencyClass}`}>
        <div className={styles.bg} aria-hidden />

        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              {isDone
                ? t("deportation-page.ready-registration")
                : t("deportation-page.staying")}
            </h1>
            <p className={styles.subtitle}>
              {isDone
                ? t("deportation-page.isDone-true")
                : t("deportation-page.isDone-false")}
            </p>
          </div>

          <div className={styles.timerWrapper}>
            <svg className={styles.ring} viewBox="0 0 280 280">
              <circle
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className={styles.ringTrack}
              />
              <circle
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className={styles.ringProgress}
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
            </svg>

            <div className={styles.timerInner}>
              {isDone ? (
                <span className={styles.doneIcon}>✓</span>
              ) : (
                <>
                  <span className={styles.daysNumber}>{daysLeft}</span>
                  <span className={styles.daysLabel}>
                    {t("deportation-page.days")}
                  </span>
                </>
              )}
            </div>
          </div>

          {!isDone && (
            <div className={styles.progressSection}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className={styles.progressLabels}>
                <span>{t("deportation-page.entry")}</span>
                <span>
                  {Math.round(progress)}% {t("deportation-page.went")}
                </span>
                <span>{totalDays} {t("deportation-page.days")}</span>
              </div>
            </div>
          )}

          {!isDone && (
            <div className={styles.cards}>
              <div className={styles.card}>
                <span className={styles.cardIcon}>📅</span>
                <span className={styles.cardLabel}>
                  {t("deportation-page.entry")}
                </span>
                <span className={styles.cardValue}>
                  {startDate.toLocaleDateString(dateLocale)}
                </span>
              </div>
              <div className={styles.card}>
                <span className={styles.cardIcon}>⏳</span>
                <span className={styles.cardLabel}>
                  {t("deportation-page.deadline")}
                </span>
                <span className={styles.cardValue}>
                  {new Date(
                    startDate.getTime() + totalDays * 24 * 60 * 60 * 1000
                  ).toLocaleDateString(dateLocale)}
                </span>
              </div>
              <div className={styles.card}>
                <span className={styles.cardIcon}>
                  {isCritical ? "🚨" : isWarning ? "⚠️" : "✅"}
                </span>
                <span className={styles.cardLabel}>
                  {t("deportation-page.status")}
                </span>
                <span className={styles.cardValue}>
                  {isCritical
                    ? t("deportation-page.urgent")
                    : isWarning
                      ? t("deportation-page.hurry")
                      : t("deportation-page.ok")}
                </span>
              </div>
            </div>
          )}

          {"Notification" in window && !notifGranted && !isDone && (
            <>
              <button
                type="button"
                className={styles.notifBtn}
                onClick={handleRequestNotif}
              >
                🔔 {t("deportation-page.enable-notification")}
              </button>
              {notificationStatus && (
                <p className={styles.notifStatus}>{notificationStatus}</p>
              )}
            </>
          )}

          <div className={styles.actions}>
            {!isDone ? (
              <button
                type="button"
                className={styles.doneBtn}
                onClick={() => setShowConfirm(true)}
              >
                ✓ {t("deportation-page.registration-success")}
              </button>
            ) : (
              <div className={styles.doneCard}>
                <p className={styles.doneText}>
                  {t("deportation-page.timer-success")} 🎉
                </p>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={handleReset}
                >
                  {t("deportation-page.reset")}
                </button>
              </div>
            )}
          </div>
        </div>

        {showConfirm && (
          <RegistrationPopup
            setShowConfirm={setShowConfirm}
            handleDone={handleDone}
          />
        )}
      </div>
    </>
  );
}

export default DeportationTimerPage;