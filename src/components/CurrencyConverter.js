import React, {useState} from 'react'
import ExchangeRate from './ExchangeRate'
import axios from 'axios'

//Using axios which is a lightweight HTTP client similar to the native Javascirpt FetchAPI

const CurrencyConverter = () => {

    //Setting the need currencies to change
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
    //Primary and Secondary currency to start the exchange
    const [primaryCurr, setPrimaryCurr] = useState('BTC')
    const [secondaryCurr, setSecondaryCurr] = useState('BTC')
    //Amount is the multiplier using when multiply with current exchange rate. Result is the final data
    
    const [amount, setAmount] = useState(1)
    const [total, setTotal] = useState(0)

    //fullData is an object in useState fillew with static datas
    const [fullData, setFullData] = useState({

        primaryCurrency :'BTC',
        secondaryCurrency: 'BTC',
        exchangeRate: 0
    })


    //Using the axios and the alpha-vantage API
    const convert = () => {
        const axios = require("axios").default;
        //Get the primary and secondary currency
        const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {from_currency: primaryCurr, function: 'CURRENCY_EXCHANGE_RATE', to_currency: secondaryCurr},
        headers: {
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            //.env is a file containing the API_KEY
            'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
        };
        //Reqesting the options filled primary and secondry
        axios.request(options).then((response) => {
            //Response.data and the needed data--> real time c. rate and exchange rate
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            //Setting the result as mentioned above multiplied with amount
            setTotal(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
            //Filling the exchanged data with dinamic datas
            setFullData({
                primaryCurrency : primaryCurr,
                secondaryCurrency: secondaryCurr,
                exchangeRate: response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
            })
        }).catch((error)  => {
            console.error(error);
        });

    }



  return (
    <div className='currency-converter'>
       <h2> Currency Exchange  </h2> 
        <div className="input-box">
        <table>
            <tbody>

                <tr>
                    <td>Primary Currency </td>
                        <td>  
                        
                            <input
                            type="number"
                            name="currency-amount-1"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                                                        /> 
                        </td>
                    <td>
                        <select 
                        value={primaryCurr} 
                        name="currency-option-1"
                        className='currency-options'
                        onChange={(e) => setPrimaryCurr(e.target.value)}

                        >
                        {currencies.map((currency, index) => (<option key={index}>{currency}</option>))}
                        </select>
                    </td>
                </tr>
            <tr>
                <td>Secondary Currency </td>
                <td>  <input
                        name="currency-amount-2"
                        value={total}
                        disabled={true}
                        /> 
                </td>
                <td>
                        <select 
                        value={secondaryCurr}
                         name="currency-option-2"
                        className='currency-options'
                        onChange={(e) => setSecondaryCurr(e.target.value)}
                         
                        >
                           
                         {currencies.map((currency, index) => (<option key={index}>{currency}</option>))}
                        </select>
                </td>
         </tr>
            </tbody>
         </table>
            <button id="convert-button" onClick={convert}>Convert</button>



        </div>

    <ExchangeRate fullData={fullData}/></div>
  )
}
export default CurrencyConverter