import type { CardDataElement } from "../DB/cardsData"
import BasePage from "./BasePage/BasePage"


interface InitialRegistrationPageProps {
  pageData: CardDataElement
}

function InitialRegistrationPage({pageData}: InitialRegistrationPageProps){

  return (
    <>
      <BasePage/>
    </>
  )
}


export default InitialRegistrationPage