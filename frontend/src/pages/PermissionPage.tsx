
import classes from './Styles.module.scss'
import Button from '../components/Button/Button'
import { useNavigate } from 'react-router'


function PermissionPage() {

  const navigate = useNavigate()

  return (
    <>
      <h1 className={classes.title}>Permission Page</h1>
      <Button name="Return Button" onClick={() => navigate("/")}/>
    </>
  )
}

export default PermissionPage