import Header from '../components/Header/Header'
import CardList from '../components/CardList/CardList'
import {cardsData} from '../DB/cardsData'

function MainPage() {
  return (
    <>
      <Header />
      <CardList cardsData={cardsData}/>
    </>
  )
}

export default MainPage