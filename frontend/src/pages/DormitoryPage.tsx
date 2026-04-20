import type { CardDataElement } from "../DB/cardsData"
import BasePage from "./BasePage"


interface DormitoryPageProps {
  pageData: CardDataElement
}


function DormitoryPage({pageData}: DormitoryPageProps) {

  return (
    <> 
      <BasePage/>
    </>
)
}

export default DormitoryPage