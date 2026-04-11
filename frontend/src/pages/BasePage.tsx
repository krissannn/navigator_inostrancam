import { useNavigate } from "react-router"
import Button from "../components/UI/Button/Button"
import type { CardDataElement } from "../DB/cardsData"

import PageCard from "../components/PageCard/PageCard"

interface BasePageProps {
  pageData:  CardDataElement
}


function BasePage({pageData}: BasePageProps) {

    
  const navigate = useNavigate()

  return (
    <> 
      
      <Button  onClick={() => navigate("/")}/>
      <PageCard title={pageData.title} logo={pageData.logo} number={pageData.id}/>
    </>
   )
  }
  
export default BasePage