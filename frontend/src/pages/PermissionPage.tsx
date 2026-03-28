
import type { CardDataElement } from '../DB/cardsData'
import BasePage from './BasePage'


interface PermissionPageProps {
  pageData: CardDataElement
}


function PermissionPage({pageData}: PermissionPageProps) {


  return (
    <>
      <BasePage pageData={pageData} />
    </>
  )
}

export default PermissionPage