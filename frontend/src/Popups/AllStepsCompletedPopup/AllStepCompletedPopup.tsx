import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import styles from "./Styles.module.scss";

type AllStepsCompletePopupProps = {
  onClose: () => void;
};

function AllStepsCompletePopup({ onClose }: AllStepsCompletePopupProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350);
  };

  const handleFaq = () => {
    setVisible(false);
    setTimeout(() => navigate("/faq"), 350);
  };

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.overlayVisible : ""}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className={`${styles.popup} ${visible ? styles.popupVisible : ""}`}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label={t("common.close")}
        >
          ✕
        </button>

        <div className={styles.confetti} aria-hidden>
          {["🎉", "⭐", "✨", "🎊", "💫"].map((emoji, i) => (
            <span
              key={i}
              className={styles.confettiPiece}
              style={{ "--i": i } as React.CSSProperties}
            >
              {emoji}
            </span>
          ))}
        </div>

        <div className={styles.iconRing}>
          <div className={styles.iconInner}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>{t("allStepsPopup.title")}</h2>
          <p className={styles.subtitle}>{t("allStepsPopup.subtitle")}</p>
        </div>

        <div className={styles.divider} />

        <div className={styles.faqBlock}>
          <span className={styles.faqIcon}>💬</span>
          <div className={styles.faqText}>
            <p className={styles.faqQuestion}>{t("allStepsPopup.faqQuestion")}</p>
            <p className={styles.faqSub}>{t("allStepsPopup.faqSub")}</p>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.faqBtn} onClick={handleFaq}>
            {t("allStepsPopup.goToFaq")}
          </button>
          <button
            type="button"
            className={styles.closeSecondary}
            onClick={handleClose}
          >
            {t("allStepsPopup.close")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllStepsCompletePopup;
