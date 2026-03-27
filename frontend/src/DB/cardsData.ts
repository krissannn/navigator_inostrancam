export type CardDataElement = {
  id: number,
  logo: string,
  title: string,
  subtitle?: string
}

export const cardsData: CardDataElement[]= [
  {
    id: 0,
    logo: './src/assets/plane.svg',
    title: 'Получение миграционной карты и визы на границе'
  },
  {
    id: 1,
    logo: './src/assets/user.svg',
    title: 'Первичный заезд',
    subtitle: 'Номер телефона, гос услуги, СНИЛС, биометрия и банки'
  },
  {
    id: 2,
    logo: './src/assets/dormitory.svg',
    title: 'Заселение в общежитие'
  },
  {
    id: 3,
    logo: './src/assets/registration.svg',
    title: 'Первичная регистрация',
    subtitle: 'Отчёт 90 дней'
  },
  {
    id: 4,
    logo: './src/assets/docs.svg',
    title: 'Документы',
    subtitle: 'Перевод паспорта, мед освидетельствование, дактилоскопия'
  },
  {
    id: 5,
    logo: './src/assets/map.svg',
    title: 'Карта корпусов + общаги',
  },
  {
    id: 6,
    logo: './src/assets/map.svg',
    title: 'Получение ВНЖ'
  }
]