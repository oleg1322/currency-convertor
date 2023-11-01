/* eslint-disable react/prop-types */
import style from '../css/CurrencyInput.module.css'

export const CurrencyInput = ( 
  {
    currencysList, 
    currencyOption, 
    onChangeOption, 
    onChangeInput,
    value
  } ) => {

  return (
    <div className={style.container}>
        <select value={currencyOption} onChange={onChangeOption}>
          {currencysList.map((currency, index) => (<option key={index} value={currency}>{currency}</option>))}
        </select>
        <input type="number" value={value} onChange={onChangeInput}/>
    </div>
  )
}
