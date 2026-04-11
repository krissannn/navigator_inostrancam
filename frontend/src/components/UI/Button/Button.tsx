import classes from "./Styles.module.scss"


interface ButtonProps {
  onClick: () => void
}

function Button({onClick}: ButtonProps) {
  return (
    <>
    
      <button className={classes.button} type="button" onClick={onClick}>
        <img src="../../src/assets/arrow_back.svg" />
      </button>
    </>
  )
}

export default Button