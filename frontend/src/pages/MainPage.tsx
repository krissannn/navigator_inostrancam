
import CardList from '../components/CardList/CardList'
import {type CardDataElement} from '../DB/cardsData'
import Title from '../components/Title/Title'



interface MainPageProps {
  cardsData: CardDataElement[]
}

function MainPage({cardsData}: MainPageProps) {

  return (
    <>
      <Title />
      <CardList cardsData={cardsData}/>
    </>
  )
}

export default MainPage