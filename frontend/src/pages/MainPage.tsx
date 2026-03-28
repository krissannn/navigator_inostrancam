import Header from '../components/Header/Header'
import CardList from '../components/CardList/CardList'
import {type CardDataElement} from '../DB/cardsData'



interface MainPageProps {
  cardsData: CardDataElement[]
}

function MainPage({cardsData}: MainPageProps) {

  return (
    <>
      <Header />
      <CardList cardsData={cardsData}/>
    </>
  )
}

export default MainPage