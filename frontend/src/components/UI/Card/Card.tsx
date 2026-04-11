
import styles from './Styles.module.scss'


interface CardProps {
  title: string,
  text: string
}

function Card({title, text}: CardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.card__title}>{title}</h3>
      <p className={styles.card__text}>{text}</p>
    </div>
  )
}

export default Card