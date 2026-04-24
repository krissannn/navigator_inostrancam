import PlanePage from '../pages/PlanePage/PlanePage'
import { Route, Routes } from 'react-router'

import MainPage from '../pages/MainPage/MainPage'

import InitialCheckInPage from '../pages/InitialCheckInPage/InitialCheckInPage'
import LongRegistrationPage from '../pages/LongRegistrationPage/LongRegistrationPage'

import  Login  from '../pages/Login/Login'
import { useState } from 'react'

import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage'
import Registration from '../pages/Registration/Registration'
import DormitoryPage from '../pages/DormitoryPage/DormitoryPage'
import VNJPage from '../pages/VNJPage/VNJPage'


// const API_URL = import.meta.env.VITE_API_URL

function AppRouter() {

  const [language, setLanguage] = useState("Russian")


  // useEffect(() => {
  //   if (language === "Russian"){
  //     setCardsData(RussianCardsData)
  //   }
  //   else if (language === "English") {
  //     setCardsData(EnglishCardsData)
  //   }
  //   else {
  //     setCardsData(ChineseCardsData)
  //   }
  // }, [language])

  const navigationRoutes = [
    {path: "/", page: <MainPage setLanguage={setLanguage}/>},
    {path: "/plane", page: <PlanePage/>},
    {path: "/check-in", page: <InitialCheckInPage />},
    {path: "/dorm", page: <DormitoryPage />},
    {path: "/long-registration", page: <LongRegistrationPage/>},
    {path: "/vnj", page: <VNJPage />},
    {path: "/login", page: <Login />},
    {path: "/registration", page: <Registration />},
    {path: "/*", page: <NotFoundPage/>}
  ]

  return (
    <>
      <Routes>
        {navigationRoutes.map(route => <Route key={route.path} path={route.path} element={route.page}/>)}
      </Routes>
    </>
  )
}

export default AppRouter;