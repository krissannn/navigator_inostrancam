import type { CardDataElement } from "../DB/cardsData"
import BasePage from "./BasePage"

interface MapPageProps {
  pageData: CardDataElement
}


function MapPage({pageData}: MapPageProps) {

  return (
    <>
      <BasePage pageData={pageData} />
    </>
  )
  
}

export default MapPage