
import type { CardDataElement } from '../DB/cardsData'
import BasePage from "./BasePage/BasePage"


interface PermissionPageProps {
  pageData: CardDataElement
}


function PermissionPage({pageData}: PermissionPageProps) {


  return (
    <>
      <BasePage/>
    </>
  )
}

export default PermissionPage