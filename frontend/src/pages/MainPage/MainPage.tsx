import CardList from "../../components/CardList/CardList";
import Title from "../../components/Title/Title";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import DeportationBanner from "../../components/DeportationBanner/DeportationBanner";
import { useAuth } from "../../Services/auth.hooks";


const API_URL = import.meta.env.VITE_API_URL;

type StepCard = {
  id: number;
  title: string;
};

function MainPage() {
  const [cards, setCards] = useState<StepCard[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetch(`${API_URL}/steps`)
      .then((response) => response.json())
      .then((data: StepCard[]) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error("Failed to load steps:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <Title />
      {isAuthenticated && <DeportationBanner />}
      {loading ? <Loading /> : <CardList cardsData={cards} />}
    </>
  );
}

export default MainPage;