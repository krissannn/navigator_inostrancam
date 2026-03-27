import classes from './Styles.module.scss'
import Button from '../components/Button/Button'
import { useNavigate } from 'react-router'

function InitialCheckInPage() {

  const navigate = useNavigate()

  return (
    <>
      <h1 className={classes.title}>Initial Check-In Page</h1>
      <Button name="Return Button" onClick={() => navigate("/")}/>
    </>
  )
}

export default InitialCheckInPage