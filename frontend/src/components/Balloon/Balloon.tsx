// components/BalloonContent.jsx

import type { Point } from '../../points';
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
        
        <div className={styles.tips}>
          <strong>💡 Советы:</strong>
          <ul>
            {point.tips.map((tip, ind) => (
              <li key={ind}>{tip}</li>
            ))}
          </ul>
        </div>
        
        <button 
          className={styles.routeButton}
          onClick={() => window.open(`https://maps.yandex.ru/?text=${point.coords[0]},${point.coords[1]}`, '_blank')}
        >Построить маршрут</button>
      </div>
    </>
  );
};

export default BalloonContent;