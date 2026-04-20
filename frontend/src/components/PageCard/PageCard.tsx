import classes from "./Styles.module.scss"


interface PageCardProps {
  step_id: number,
  title: string,
  icon_link: string,
}

function PageCard({step_id, title, icon_link}: PageCardProps) {
  return (
    <div className={classes.page_card}>
      <div className={classes.page_card_top}>
        <img className={classes.page_card_img} src={icon_link}></img>
        <div className={classes.page_card_text}>
          <h3 className={classes.page_card_counter}>Шаг {step_id}</h3>
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  )
}

export default PageCard