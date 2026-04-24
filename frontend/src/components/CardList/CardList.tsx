import classes from './Styles.module.scss'

import Card from '../Card/Card'


import { useNavigate } from 'react-router'


type CardDataElement = {
  id: number,
  icon: string,
  title: string,
}

type CardListProps = {
  cardsData: CardDataElement[]
}


const icons = {
  0: '../src/assets/plane.svg',
  1: '../src/assets/motorcycle.svg',
  2: '../src/assets/dormitory.svg',
  3: '../src/assets/registration.svg',
  4: '../src/assets/docs.svg',
  5: '../src/assets/faq.svg',
}

function CardList({cardsData}: CardListProps)   {

  const navigate = useNavigate()

  const navigationTo: Record<number, string> = {
    0: '/plane',
    1: '/check-in',
    2: '/dorm',
    3: '/long-registration',
    4: '/vnj',
    5: '/faq',
  }


  const renderCards = () => {
    return cardsData.map((card : CardDataElement, idx: number) => {
        return <Card key={card.id} number={card.id} icon={icons[idx]} title={card.title} onClick={() => navigate(navigationTo[card.id])}/>
    })
  }

  return (
    <div className={classes.cards_container}>
      {renderCards()}
    </div>
  )
}

export default CardList