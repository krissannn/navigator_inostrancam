
import BasePage from "./BasePage/BasePage"
import type { CardDataElement } from "../DB/cardsData"


interface DocumentsPageProps {
  pageData: CardDataElement
}

function DocumentsPage({pageData}: DocumentsPageProps) {

  return (
    <>
      <BasePage/>
    </>
  )
}

export default DocumentsPage