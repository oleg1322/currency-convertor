import { useEffect, useState } from 'react'
import axios from 'axios';
import { CurrencyInput } from './components/CurrencyInput'
import style from './css/App.module.css'

function App() {

  const baseUrl = 'https://api.apilayer.com/fixer/latest'
 
  const [currencys, setCurrencys] = useState([]);
  const [currencyFrom, setCurrencyFrom] = useState();
  const [currencyTo, setCurrencyTo] = useState();

  const [currencyValue, setCurrencyValue] = useState(1);
  const [currencyRate, setCurrencyRate] = useState();
  const [valueFrom, setValueFrom] = useState(1);
  const [valueTo, setValueTo] = useState(1);

  useEffect(() => {
    (setValueFrom(currencyValue), setValueTo(currencyValue * currencyRate))
  }, [currencyFrom, currencyTo, currencyValue, currencyRate])
  
  const config = {
    headers: {
      'apikey': '9A8jcHmDOV3gheplVu4EQtDSOBXOGoCu',
    }
  };
  
  //для получения по апи
  
  useEffect(() => {
    axios.get(baseUrl, config)
      .then(response => {
        console.log(response);

        const data = response.data;
        const defaultCurrencys = [data.base, 'RUB']

        setCurrencys([data.base, ...Object.keys(data.rates)]);
        setCurrencyFrom(defaultCurrencys[0]);
        setCurrencyTo(defaultCurrencys[1]);
        setCurrencyRate(data.rates[defaultCurrencys[1]])
      })
      .catch(error => {
        console.error('Ошибка при запросе:', error);
      });
  }, []);

  //для смены валюты в выпадающем меню
  useEffect(() => {
    currencyFrom && currencyTo &&
      axios.get(`${baseUrl}?base=${currencyFrom}&symbols=${currencyTo}`, config)
      .then(response => {
        const data = response.data;
        console.log(data)
        setCurrencyRate(data.rates[currencyTo])
      })
      .catch(error => {
        console.error('Ошибка при запросе:', error);
      })
  }, [config, currencyFrom, currencyTo]);
  
  const swipeCurrencyOption = () => {
    const swipeOption = currencyFrom;
    setCurrencyFrom(currencyTo)
    setCurrencyTo(swipeOption)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.main__text}>Amount</div>
        <CurrencyInput
          currencysList={currencys}
          currencyOption={currencyFrom}
          onChangeOption={e => setCurrencyFrom(e.target.value)}
          onChangeInput={e => setCurrencyValue(e.target.value)}
          value={valueFrom}
        />
        <button onClick={swipeCurrencyOption}>
          <img src="/convert.png" alt="" />
        </button>
        <div className={style.main__text}>Converted Amount</div>
        <CurrencyInput
          currencysList={currencys}
          currencyOption={currencyTo}
          onChangeOption={e => setCurrencyTo(e.target.value)}
          onChangeInput={e => setCurrencyValue(e.target.value)}
          value={valueTo}
        />
      </div>
    </div>
  )
}

export default App