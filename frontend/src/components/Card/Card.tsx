
import classes from '../Card/Card.module.css'

type CardProps = {
  number: number,
  logo: string,
  title: string
}

function Card({number, logo, title}: CardProps){
  return (
    <div className={classes.card}>
      <div className={classes.card_top}>
        <img className={classes.card_img} src={logo}></img>
        <h3 className={classes.card_counter}>{number}</h3>
      </div>
      <h3>{title}</h3>
    </div>
  )
}

export default Card