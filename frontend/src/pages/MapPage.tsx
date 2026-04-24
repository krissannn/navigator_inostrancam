import type { CardDataElement } from "../DB/cardsData"
import BasePage from "./BasePage/BasePage"

interface MapPageProps {
  pageData: CardDataElement
}


function MapPage({pageData}: MapPageProps) {

  return (
    <>
      <BasePage/>
    </>
  )
  
}

export default MapPage