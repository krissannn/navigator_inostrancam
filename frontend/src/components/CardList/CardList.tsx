import classes from './CardList.module.css'

import Card from '../Card/Card'

import {type CardDataElement}from '../../DB/cardsData'




type CardListProps = {
  cardsData: CardDataElement[]
}


function CardList({cardsData}: CardListProps)   {

  const renderCards = () => {
    return cardsData.map((card : CardDataElement) => {
        return <Card number={card.id} logo={card.logo} title={card.title} />
    })
  }

  return (
    <div className={classes.cards_container}>
      {renderCards()}
    </div>
  )
}

export default CardList