import { useTranslation } from "react-i18next";
import classes from "./Styles.module.scss";

type CardProps = {
  number: number;
  icon: string;
  onClick?: () => void;
};

function Card({ number, icon, onClick }: CardProps) {
  const { t } = useTranslation();

  return (
    <div className={classes.card} onClick={onClick}>
      <div className={classes.card_top}>
        <img className={classes.card_icon} src={icon} alt="" />
        <h3 className={classes.card_counter}>{number}</h3>
      </div>
      <h3 className={classes.card_title}>{t(`mainPage.step_${number}`)}</h3>
      <span className={classes.detailsText}>{t("mainPage.moreDetails")}</span>
    </div>
  );
}

export default Card;