import classes from './Styles.module.scss'

import Card from '../Card/Card'

import {type CardDataElement}from '../../DB/cardsData'
import { useNavigate } from 'react-router'




type CardListProps = {
  cardsData: CardDataElement[]
}


function CardList({cardsData}: CardListProps)   {

  const navigate = useNavigate()

  const navigationTo: Record<number, string> = {
    0: '/plane',
    1: '/check-in',
    2: '/dorm',
    3: '/initial-registration',
    4: '/docs',
    5: '/map',
    6: '/permission'
  }

  const renderCards = () => {
    return cardsData.map((card : CardDataElement) => {
        return <Card key={card.id} number={card.id} logo={card.logo} title={card.title} onClick={() => navigate(navigationTo[card.id])}/>
    })
  }

  return (
    <div className={classes.cards_container}>
      {renderCards()}
    </div>
  )
}

export default CardList