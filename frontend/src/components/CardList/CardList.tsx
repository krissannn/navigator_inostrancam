import classes from './Styles.module.scss'

import Card from '../Card/Card'

import {type CardDataElement}from '../../DB/cardsData'
import { useNavigate } from 'react-router'




type CardListProps = {
  cardsData: CardDataElement[]
}


function CardList({cardsData}: CardListProps)   {

  const navigate = useNavigate()

  const navigationTo: Record<string, string> = {
    'Получение миграционной карты и визы на границе': '/plane',
    'Первичный заезд': '/check-in',
    'Заселение в общежитие': '/dorm',
    'Первичная регистрация': '/initial-registration',
    'Документы': '/docs',
    'Карта корпусов + общаги': '/map',
    'Получение ВНЖ': '/permission'
  }

  const renderCards = () => {
    return cardsData.map((card : CardDataElement) => {
        return <Card number={card.id} logo={card.logo} title={card.title} onClick={() => navigate(navigationTo[card.title])}/>
    })
  }

  return (
    <div className={classes.cards_container}>
      {renderCards()}
    </div>
  )
}

export default CardList