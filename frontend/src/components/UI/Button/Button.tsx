import classes from "./Styles.module.scss"

interface ButtonProps {
  src?: string,
  content?: string,
  onClick?: () => void
}

function Button({src, content, onClick}: ButtonProps) {
  return (
    <>
    
      <button className={classes.button} onClick={onClick} type="button">
        <img src={src} />
        {content && <span>{content}</span>}
      </button>
    </>
  )
}

export default Button