
import styles from './Styles.module.scss';
import { Link } from 'react-router';

function NotFoundPageComponent() {
  return (
    <div className={styles.container}>
      <h2>404 Error</h2>
      <p>Oops! The page you're looking for does not exist.</p>
      <Link to={'/'} className={styles.container__link}>Go home</Link>

    </div>
  );
}

export const NotFoundPage = NotFoundPageComponent