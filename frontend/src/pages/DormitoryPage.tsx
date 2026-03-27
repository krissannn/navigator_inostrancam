
import classes from './Styles.module.scss'
import { useNavigate } from 'react-router'
import Button from "../components/Button/Button"


function DormitoryPage() {

  const navigate = useNavigate()

  return (
    <> 
      <h1 className={classes.title}>Dormitory Page</h1>
      <Button name="Return Button" onClick={() => navigate("/")}/>
    </>
)
}

export default DormitoryPage