import PlanePage from '../Pages/PlanePage'
import { Route, Routes } from 'react-router'

import MainPage from '../Pages/MainPage'
import DocumentsPage from '../Pages/DocumentsPage'
import DormitoryPage from '../Pages/DormitoryPage'
import InitialCheckInPage from '../Pages/InitialCheckInPage'
import InitialRegistrationPage from '../Pages/InitialRegistrationPage'
import MapPage from '../Pages/MapPage'
import PermissionPage from '../Pages/PermissionPage'
import { Login } from '../Pages/Login/Login'
import { useEffect, useState } from 'react'

import { EnglishCardsData, RussianCardsData, ChineseCardsData } from '../DB/cardsData'
import Header from '../components/Header/Header'
import { NotFoundPage } from '../Pages/NotFoundPage/NotFoundPage'


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
    {path: "/permission", page: <PermissionPage pageData={cardsData[6]}/>},
    {path: "/login", page: <Login />},
    {path: "/*", page: <NotFoundPage/>}
  ]

  return (
    <>
      <Header setLanguage={setLanguage}/>
      <Routes>
        {navigationRoutes.map(route => <Route key={route.path} path={route.path} element={route.page}/>)}
      </Routes>
    </>
  )
}

export default AppRouter;