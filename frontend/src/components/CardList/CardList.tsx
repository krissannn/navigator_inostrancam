import classes from "./Styles.module.scss";
import Card from "../Card/Card";
import plane from "../../assets/plane.svg";
import motorcycle from "../../assets/motorcycle.svg";
import dormitory from "../../assets/dormitory.svg";
import registration from "../../assets/registration.svg";
import docs from "../../assets/docs.svg";
import faq from "../../assets/faq.svg";
import { useNavigate } from "react-router";

type CardDataElement = {
  id: number;
  title: string;
};

type CardListProps = {
  cardsData: CardDataElement[];
};

const icons: Record<number, string> = {
  0: plane,
  1: motorcycle,
  2: dormitory,
  3: registration,
  4: docs,
  5: faq,
};

const navigationTo: Record<number, string> = {
  0: "/plane",
  1: "/check-in",
  2: "/dorm",
  3: "/long-registration",
  4: "/vnj",
  5: "/faq",
};

function CardList({ cardsData }: CardListProps) {
  const navigate = useNavigate();

  return (
    <div className={classes.cards_container}>
      {cardsData.map((card) => (
        <Card
          key={card.id}
          number={card.id}
          icon={icons[card.id] ?? plane}
          onClick={() => navigate(navigationTo[card.id])}
        />
      ))}
    </div>
  );
}

export default CardList;
