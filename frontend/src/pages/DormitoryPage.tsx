import type { CardDataElement } from "../DB/cardsData"
import BasePage from "./BasePage"


interface DormitoryPageProps {
  pageData: CardDataElement
}


function DormitoryPage({pageData}: DormitoryPageProps) {

  return (
    <> 
      <BasePage pageData={pageData}/>
    </>
)
}

export default DormitoryPage