import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Styles.module.scss";

const DOCUMENT_IDS = [
  "passport",
  "passportTranslation",
  "migrationCard",
  "dactyloscopy",
  "registration",
  "medicalCert",
  "dmsPolicy",
  "studentCard",
] as const;

const QUEUE_OPTION_IDS = ["noQueue", "15min", "30min", "moreThanHour"] as const;

export type ReviewFormData = {
  stressLevel: number;
  queueTime: string;
  scheduleMatch: "yes" | "no" | "custom";
  scheduleCustom: string;
  documents: string[];
};

type ReviewFormProps = {
  onSubmit: (data: ReviewFormData) => void;
  onClose: () => void;
};

function ReviewForm({ onSubmit, onClose }: ReviewFormProps) {
  const { t } = useTranslation();
  const [stressLevel, setStressLevel] = useState(0);
  const [hoveredFlame, setHoveredFlame] = useState(0);
  const [queueTime, setQueueTime] = useState("");
  const [scheduleMatch, setScheduleMatch] = useState<"yes" | "no" | "custom" | "">("");
  const [scheduleCustom, setScheduleCustom] = useState("");
  const [documents, setDocuments] = useState<string[]>([]);

  const documentsList = useMemo(
    () =>
      DOCUMENT_IDS.map((id) => ({
        id,
        label: t(`review-popup.documents.${id}`),
      })),
    [t]
  );

  const queueOptions = useMemo(
    () =>
      QUEUE_OPTION_IDS.map((id) => ({
        id,
        label: t(`review-popup.queueOptions.${id}`),
      })),
    [t]
  );

  const stressLabels = [
    "",
    t("review-popup.stress-lvl-1"),
    t("review-popup.stress-lvl-2"),
    t("review-popup.stress-lvl-3"),
    t("review-popup.stress-lvl-4"),
    t("review-popup.stress-lvl-5"),
  ];

  const isValid =
    stressLevel > 0 &&
    queueTime !== "" &&
    scheduleMatch !== "" &&
    (scheduleMatch !== "custom" || scheduleCustom.trim() !== "");

  const handleDocumentToggle = (id: string) => {
    setDocuments((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit({
      stressLevel,
      queueTime,
      scheduleMatch: scheduleMatch as "yes" | "no" | "custom",
      scheduleCustom,
      documents,
    });
  };

  const activeFlame = hoveredFlame || stressLevel;

  return (
    <div className={styles.overlay}>
      <div className={styles.form}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>{t("review-popup.review")}</h2>
        <p className={styles.subtitle}>{t("review-popup.review-subtitle")}</p>

        <div className={styles.section}>
          <label className={styles.label}>{t("review-popup.stress-level")}</label>
          <div className={styles.flames}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={`${styles.flame} ${n <= activeFlame ? styles.flameActive : ""}`}
                onClick={() => setStressLevel(n)}
                onMouseEnter={() => setHoveredFlame(n)}
                onMouseLeave={() => setHoveredFlame(0)}
                aria-label={`${t("review-popup.stress-level")} ${n}`}
              >
                🔥
              </button>
            ))}
            {stressLevel > 0 && (
              <span className={styles.flameLabel}>{stressLabels[stressLevel]}</span>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{t("review-popup.queue")}</label>
          <div className={styles.pills}>
            {queueOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`${styles.pill} ${queueTime === opt.id ? styles.pillActive : ""}`}
                onClick={() => setQueueTime(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{t("review-popup.graphics-question")}</label>
          <div className={styles.pills}>
            {(["yes", "no", "custom"] as const).map((val) => (
              <button
                key={val}
                type="button"
                className={`${styles.pill} ${scheduleMatch === val ? styles.pillActive : ""}`}
                onClick={() => setScheduleMatch(val)}
              >
                {val === "yes"
                  ? t("review-popup.yes")
                  : val === "no"
                    ? t("review-popup.no")
                    : t("review-popup.custom")}
              </button>
            ))}
          </div>
          {scheduleMatch === "custom" && (
            <input
              className={styles.input}
              placeholder={t("review-popup.hint")}
              value={scheduleCustom}
              onChange={(e) => setScheduleCustom(e.target.value)}
            />
          )}
        </div>

        <div className={styles.section}>
          <label className={styles.label}>{t("review-popup.docs-question")}</label>
          <div className={styles.checkboxGrid}>
            {documentsList.map((doc) => (
              <label key={doc.id} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={documents.includes(doc.id)}
                  onChange={() => handleDocumentToggle(doc.id)}
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxCustom}>
                  {documents.includes(doc.id) && (
                    <span className={styles.checkmark}>✓</span>
                  )}
                </span>
                <span className={styles.checkboxText}>{doc.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`${styles.submitBtn} ${!isValid ? styles.submitBtnDisabled : ""}`}
          onClick={handleSubmit}
          disabled={!isValid}
        >
          {t("review-popup.submit")}
        </button>
      </div>
    </div>
  );
}

export default ReviewForm;
