
import classes from '../Card/Styles.module.scss'



type CardProps = {
  number: number,
  icon: string,
  title: string,
  onClick?: () => void 
}

function Card({number, icon, title, onClick}: CardProps){
  return (
    <div className={classes.card} onClick={onClick}>
      <div className={classes.card_top}>
        <img className={classes.card_icon} src={icon}/>
        <h3 className={classes.card_counter}>{number}</h3>
      </div>
      <h3>{title}</h3>
    </div>
  )
}

export default Card