import type { CardDataElement } from "../DB/cardsData"
import BasePage from "./BasePage"


interface InitialCheckInPageProps {
  pageData: CardDataElement
}

function InitialCheckInPage({pageData}: InitialCheckInPageProps ) {

  return (
    <>
      <BasePage pageData={pageData}/>
    </>
  )
}

export default InitialCheckInPage