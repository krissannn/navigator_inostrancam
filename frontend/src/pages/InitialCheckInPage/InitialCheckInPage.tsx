import InfoMap from "../../components/InfoMap/InfoMap"
import PageCard from "../../components/PageCard/PageCard"
import BasePage from "../BasePage/BasePage"
import styles from "./Styles.module.scss"
import { steps } from "../../DB/points"
import { bankGeoJSON, mfcGeoJSON } from "../../utils/placeGeneration"
import InfoPanel from "../../components/InfoPanel/InfoPanel"
import { useEffect, useState } from "react"
import Loading from "../../components/Loading/Loading"
import SuccessPopup from "../../Popups/SuccessPopup/SuccessPopup"
import Checklist from "../../components/Checklist/Checklist"
import motorcycle from "../../assets/motorcycle.svg"

const API_URL = import.meta.env.VITE_API_URL

function InitialCheckInPage() {

  const [isVisible, setIsVisible] = useState(false)
  const [info, setInfo] = useState({ content: "", checklist: [] }) 
  const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      fetch(`${API_URL}/steps/1/articles`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setInfo(data[0])
          setLoading(false)
        })
        .catch(error => {
          console.error("Ошибка:", error)
          setLoading(false)
        })
    }, [])

  return (
    <>
       {loading && <Loading/>}

      {isVisible && <SuccessPopup to={"/dorm"}/>}

      <BasePage />
      <InfoMap features={[mfcGeoJSON, bankGeoJSON]} presets={["islands#purpleDotIcon", "islands#greenMoneyIcon"]} zoom={11}>
        <div className={styles.container__info}>
          <PageCard step_id={info.step_id} title={info.title} icon_link={motorcycle} />
          <InfoPanel description={info.content} />
          {info.checklist && info.checklist.length > 0 && (
              <Checklist checklist={info.checklist} setIsVisible={setIsVisible}/>
            )}
        </div>
      </InfoMap>
    </>
  )
}

export default InitialCheckInPage