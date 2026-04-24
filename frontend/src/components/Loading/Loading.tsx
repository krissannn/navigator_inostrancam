import styles from "./Styles.module.scss";

type LoadingProps = {
  text?: string;
};

function Loading({ text = "Загрузка..."}: LoadingProps) {
  return (
    <div className={styles.loader}>
      <div className={styles.ring}>
        <div className={styles.dot} />
      </div>
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
}

export default Loading;