

import Header from './components/Header/Header'
import CardList from './components/CardList/CardList'
import {cardsData} from './DB/cardsData'
import './App.css'

function App() {


  return (
    <>
      <Header />
      <CardList cardsData={cardsData}/>
    </>
  )
}

export default App
