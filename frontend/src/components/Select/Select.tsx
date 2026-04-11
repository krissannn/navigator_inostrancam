import type { ChangeEvent } from "react";
import styles from './Styles.module.scss'


export interface SelectProps {
  setLanguage: (language: string) => void
}

function Select({setLanguage}: SelectProps) {

  const onChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(evt.target.value)
  }


  return (
    <>
      <select className={styles.select} onChange={onChange}>
        <option value="Russian">Русский</option>
        <option value="English">English</option>
        <option value="Chinese">中文</option>
      </select>
    </>
  )
}

export default Select;