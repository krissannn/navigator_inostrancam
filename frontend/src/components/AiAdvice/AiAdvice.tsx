import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import styles from "./Styles.module.scss";

const API_URL = import.meta.env.VITE_API_URL;

type AiAdviceProps = {
  stepId: number;
};

type AiResponse = {
  analysis: string;
};

function AiAdvice({ stepId }: AiAdviceProps) {
  const { t } = useTranslation();
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchAdvice = async () => {
    if (advice) {
      setIsOpen((prev) => !prev);
      return;
    }

    setLoading(true);
    setError(false);
    setIsOpen(true);

    try {
      const response = await fetch(
        `${API_URL}/ai/analyze-step/${stepId}?days=30`
      );
      if (!response.ok) throw new Error("AI request failed");
      const data: AiResponse = await response.json();
      setAdvice(data.analysis || t("aiAdvice.empty"));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.trigger} onClick={fetchAdvice}>
        <span className={styles.triggerIcon}>✨</span>
        <span className={styles.triggerText}>
          {isOpen ? t("aiAdvice.hide") : t("aiAdvice.show")}
        </span>
        <span
          className={`${styles.triggerArrow} ${isOpen ? styles.triggerArrowOpen : ""}`}
        >
          ▾
        </span>
      </button>

      {isOpen && (
        <div className={styles.panel}>
          {loading && (
            <div className={styles.loading}>
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
              <span className={styles.loadingText}>{t("aiAdvice.loading")}</span>
            </div>
          )}

          {error && !loading && (
            <div className={styles.error}>
              <span>⚠️</span>
              <span>{t("aiAdvice.error")}</span>
              <button
                type="button"
                className={styles.retryBtn}
                onClick={() => {
                  setAdvice(null);
                  void fetchAdvice();
                }}
              >
                {t("aiAdvice.retry")}
              </button>
            </div>
          )}

          {advice && !loading && (
            <div className={styles.advice}>
              <div className={styles.adviceHeader}>
                <span className={styles.adviceIcon}>🤖</span>
                <span className={styles.adviceLabel}>{t("aiAdvice.title")}</span>
              </div>
              <div className={styles.adviceText}>
                <ReactMarkdown>{advice}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AiAdvice;
