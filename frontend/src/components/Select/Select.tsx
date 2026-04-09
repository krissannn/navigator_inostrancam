import type { ChangeEvent } from "react";



interface SelectProps {
  setLanguage: (language: string) => void
}

function Select({setLanguage}: SelectProps) {

  const onChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(evt.target.value)
  }


  return (
    <>
      <select onChange={onChange}>
        <option value="Russian">Русский</option>
        <option value="English">English</option>
        <option value="Chinese">中文</option>
      </select>
    </>
  )
}

export default Select;