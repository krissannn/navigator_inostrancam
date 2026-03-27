
import classes from './Styles.module.scss'
import Button from '../components/Button/Button'
import { useNavigate } from 'react-router'

function MapPage() {

  const navigate = useNavigate()

  return (
    <>
      <h1 className={classes.title}>Map Page</h1>
      <Button name="Return Button" onClick={() => navigate("/")}/>
    </>
  )
  
}

export default MapPage