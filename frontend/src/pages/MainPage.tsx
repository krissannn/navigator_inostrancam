
import CardList from '../components/CardList/CardList'
import Title from '../components/Title/Title'
import Header from '../components/Header/Header'
import { useEffect, useState } from 'react'
import { RussianCardsData } from '../DB/cardsData'


const API_URL = import.meta.env.VITE_API_URL


interface MainPageProps {
  setLanguage: (language: string) => void
}

function MainPage({setLanguage}: MainPageProps) {

  const [cards, setCards] = useState([])

useEffect(() => {
  fetch(`${API_URL}/steps`)
    .then(response => response.json())
    .then(data => {
      setCards(data);
      console.log('Данные получены:', data);
    })
    .catch(err => console.error('Ошибка:', err));

}, []);
  


  return (
    <>
      <Header setLanguage={setLanguage}/>
      <Title />
      <CardList cardsData={RussianCardsData}/>
      {/* <CardList cardsData={cards.length === 0 ? RussianCardsData : cards}/> */}
    </>
  )
}

export default MainPage