import { Link } from "react-router"
import Button from "../../components/UI/Button/Button"
import styles from "./Styles.module.scss"




function BasePage() {

  

  return (
    <> 
      <div className={styles.return_button}>
        <Link to="/"><Button src="/src/assets/arrow_back.svg"/></Link>
      </div>
    </>
   )
  }
  
export default BasePage