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
        <option value="Russian">Russian</option>
        <option value="English">English</option>
        <option value="Chinese">Chinese</option>
      </select>
    </>
  )
}

export default Select;