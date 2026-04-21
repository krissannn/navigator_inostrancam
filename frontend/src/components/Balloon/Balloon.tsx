// components/BalloonContent.jsx
import styles from './Styles.module.scss'; 



const BalloonContent = ({ point, totalPoints }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container__step}>
          Шаг {point.step} из {totalPoints}
        </div>
        
        <h2 className={styles.title}>
          {point.name}
        </h2>
        
        <p className={styles.address}>
          📍 {point.address}
        </p>
        
        <div className={styles.description}>
          {point.description}
        </div>
      </div>
    </>
  );
};

export default BalloonContent;