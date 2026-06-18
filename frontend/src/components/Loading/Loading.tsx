import { useTranslation } from "react-i18next";
import styles from "./Styles.module.scss";

type LoadingProps = {
  text?: string;
};

function Loading({ text }: LoadingProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.loader}>
      <div className={styles.ring}>
        <div className={styles.dot} />
      </div>
      <span className={styles.text}>{text ?? t("common.loading")}</span>
    </div>
  );
}

export default Loading;
