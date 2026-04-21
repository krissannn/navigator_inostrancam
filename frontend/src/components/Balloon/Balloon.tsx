// components/BalloonContent.jsx

import type { Point } from '../../DB/points';
import styles from './Styles.module.scss'; 

interface BalloonContentProps {
  point: Point,
  totalPoints: number;
}


const BalloonContent = ({ point, totalPoints }: BalloonContentProps) => {
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