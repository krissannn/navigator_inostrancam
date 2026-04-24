import InfoMap from "../../components/InfoMap/InfoMap"
import PageCard from "../../components/PageCard/PageCard"
import type { CardDataElement } from "../../DB/cardsData"
import BasePage from "../BasePage/BasePage"
import styles from "./Styles.module.scss"
import { steps } from "../../DB/points"
import { bankGeoJSON, mfcGeoJSON } from "../../utils/placeGeneration"
import InfoPanel from "../../components/InfoPanel/InfoPanel"
import Checklist from "../../components/Checklist/Checklist"

interface InitialCheckInPageProps {
  pageData: CardDataElement
}

function InitialCheckInPage({pageData}: InitialCheckInPageProps ) {

  return (
    <>
      <BasePage />
      <InfoMap features={[mfcGeoJSON, bankGeoJSON]} presets={["islands#purpleDotIcon", "islands#greenHomeIcon"]} zoom={11}>
        <div className={styles.container__info}>
          <PageCard step_id={steps[1].step_id} title={steps[1].title} icon_link={steps[1].icon_link} />
          <Checklist checklist={steps[1].checklist} />
          <InfoPanel description={steps[1].description} />
        </div>
      </InfoMap>
    </>
  )
}

export default InitialCheckInPage