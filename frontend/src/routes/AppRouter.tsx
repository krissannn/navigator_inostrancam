import PlanePage from '../pages/PlanePage'
import { Route, Routes } from 'react-router'

import MainPage from '../pages/MainPage'
import DocumentsPage from '../pages/DocumentsPage'
import DormitoryPage from '../pages/DormitoryPage'
import InitialCheckInPage from '../pages/InitialCheckInPage'
import InitialRegistrationPage from '../pages/InitialRegistrationPage'
import MapPage from '../pages/MapPage'
import PermissionPage from '../pages/PermissionPage'


function AppRouter() {

  const navigationRoutes = [
    {path: "/", page: <MainPage />},
    {path: "/plane", page: <PlanePage/>},
    {path: "/docs", page: <DocumentsPage/>},
    {path: "/dorm", page: <DormitoryPage/>},
    {path: "/check-in", page: <InitialCheckInPage/>},
    {path: "/initial-registration", page: <InitialRegistrationPage/>},
    {path: "/map", page: <MapPage />},
    {path: "/permission", page: <PermissionPage />}
  ]

  return (
    <Routes>
      {navigationRoutes.map(route => <Route key={route.path} path={route.path} element={route.page}/>)}
    </Routes>
  )
}

export default AppRouter;