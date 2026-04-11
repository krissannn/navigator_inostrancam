

import './Styles.scss'
import { BrowserRouter } from 'react-router'

import AppRouter from '../Routes/AppRouter.tsx'

function App() {


  return (
    <>
      <BrowserRouter>
        <AppRouter />
        
      </BrowserRouter>
    </>
  )
}

export default App
