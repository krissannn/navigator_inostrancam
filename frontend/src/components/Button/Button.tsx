import classes from "./Styles.module.scss"


interface ButtonProps {
  name: string,
  onClick: () => void
}

function Button({name, onClick}: ButtonProps) {
  return (
    <button className={classes.button} type="button" onClick={onClick}>{name}</button>
  )
}

export default Button