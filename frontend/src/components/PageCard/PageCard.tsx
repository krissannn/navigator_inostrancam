import classes from "./Styles.module.scss"


interface PageCardProps {
  logo: string,
  number: number,
  title: string
}

function PageCard({logo, number, title}: PageCardProps) {
  return (
    <div className={classes.page_card}>
      <div className={classes.page_card_top}>
        <img className={classes.page_card_img} src={logo}></img>
        <div className={classes.page_card_text}>
          <h3 className={classes.page_card_counter}>Шаг {number}</h3>
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  )
}

export default PageCard