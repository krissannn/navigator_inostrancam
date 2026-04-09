export type CardDataElement = {
  id: number,
  logo: string,
  title: string,
  subtitle?: string
}



export const RussianCardsData: CardDataElement[]= [
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


export const EnglishCardsData: CardDataElement[] = [
  {
    id: 0,
    logo: './src/assets/plane.svg',
    title: 'Obtaining migration card and visa at the border'
  },
  {
    id: 1,
    logo: './src/assets/user.svg',
    title: 'Initial entry',
    subtitle: 'Phone number, public services, SNILS, biometrics, and banks'
  },
  {
    id: 2,
    logo: './src/assets/dormitory.svg',
    title: 'Check-in to dormitory'
  },
  {
    id: 3,
    logo: './src/assets/registration.svg',
    title: 'Initial registration',
    subtitle: '90-day report'
  },
  {
    id: 4,
    logo: './src/assets/docs.svg',
    title: 'Documents',
    subtitle: 'Passport translation, medical examination, fingerprinting'
  },
  {
    id: 5,
    logo: './src/assets/map.svg',
    title: 'Campus map + dormitory'
  },
  {
    id: 6,
    logo: './src/assets/map.svg',
    title: 'Obtaining temporary residence permit'
  }
];

export const ChineseCardsData: CardDataElement[] = [
  {
    id: 0,
    logo: './src/assets/plane.svg',
    title: '在边境办理移民卡和签证'
  },
  {
    id: 1,
    logo: './src/assets/user.svg',
    title: '初次入境',
    subtitle: '电话号码、政府服务、个人保险号、生物识别和银行'
  },
  {
    id: 2,
    logo: './src/assets/dormitory.svg',
    title: '入住宿舍'
  },
  {
    id: 3,
    logo: './src/assets/registration.svg',
    title: '初次登记',
    subtitle: '90天报告'
  },
  {
    id: 4,
    logo: './src/assets/docs.svg',
    title: '文件办理',
    subtitle: '护照翻译、体检、指纹登记'
  },
  {
    id: 5,
    logo: './src/assets/map.svg',
    title: '校区地图 + 宿舍'
  },
  {
    id: 6,
    logo: './src/assets/map.svg',
    title: '办理临时居留许可'
  }
];