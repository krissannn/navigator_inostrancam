import PlanePage from '../pages/PlanePage'
import { Route, Routes } from 'react-router'

import MainPage from '../pages/MainPage'
import DocumentsPage from '../pages/DocumentsPage'
import DormitoryPage from '../pages/DormitoryPage'
import InitialCheckInPage from '../pages/InitialCheckInPage'
import InitialRegistrationPage from '../pages/InitialRegistrationPage'
import MapPage from '../pages/MapPage'
import PermissionPage from '../pages/PermissionPage'
import Select from '../components/Select/Select'
import { useEffect, useState } from 'react'

import { EnglishCardsData, RussianCardsData, ChineseCardsData } from '../DB/cardsData'


function AppRouter() {

  const [language, setLanguage] = useState("Russian")
  const [cardsData, setCardsData] = useState(RussianCardsData)

  const checkLanguage = () => {
    if (language === "Russian"){
      setCardsData(RussianCardsData)
    }
    else if (language === "English") {
      setCardsData(EnglishCardsData)
    }
    else {
      setCardsData(ChineseCardsData)
    }
  }

  useEffect(() => {
    checkLanguage()
  }, [language])

  const navigationRoutes = [
    {path: "/", page: <MainPage cardsData = {cardsData}/>},
    {path: "/plane", page: <PlanePage pageData={cardsData[0]}/>},
    {path: "/check-in", page: <InitialCheckInPage pageData={cardsData[1]}/>},
    {path: "/dorm", page: <DormitoryPage pageData={cardsData[2]}/>},
    {path: "/initial-registration", page: <InitialRegistrationPage pageData={cardsData[3]}/>},
    {path: "/docs", page: <DocumentsPage pageData={cardsData[4]}/>},
    {path: "/map", page: <MapPage pageData={cardsData[5]}/>},
    {path: "/permission", page: <PermissionPage pageData={cardsData[6]}/>}
  ]

  console.log(language)

  return (
    <>
      <Select setLanguage={setLanguage}/>
      <Routes>
        {navigationRoutes.map(route => <Route key={route.path} path={route.path} element={route.page}/>)}
      </Routes>
    </>
  )
}

export default AppRouter;