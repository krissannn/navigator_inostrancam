

import type { CardDataElement } from "../DB/cardsData";
import BasePage from "./BasePage"

interface PlanePageProps {
  pageData: CardDataElement
}

function PlanePage({pageData}: PlanePageProps ) {

  return (
    <> 
      <BasePage pageData={pageData}/>
    </>
   )
  }

export default PlanePage;