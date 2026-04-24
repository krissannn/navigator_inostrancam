
import classes from '../Card/Styles.module.scss'



type CardProps = {
  number: number,
  logo: string,
  title: string,
  onClick?: () => void 
}

function Card({number, logo, title, onClick}: CardProps){
  return (
    <div className={classes.card} onClick={onClick}>
      <div className={classes.card_top}>
        <img className={classes.card_img} src={logo}></img>
        <h3 className={classes.card_counter}>{number}</h3>
      </div>
      <h3>{title}</h3>
    </div>
  )
}

export default Card