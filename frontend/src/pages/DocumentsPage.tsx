import { useNavigate } from "react-router"
import Button from "../components/Button/Button"
import classes from './Styles.module.scss'

function DocumentsPage() {

  const navigate = useNavigate()

  return (
    <>
      <h1 className={classes.title}>Documents Page</h1>
      <Button name="Return Button" onClick={() => navigate("/")}/>
    </>
  )
}

export default DocumentsPage