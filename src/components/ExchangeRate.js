import React from 'react'
//exchangedData as a object state exported into CurrencyConverter spreaded into 3 elements as child
const ExchangeRate = ({fullData}) => {
  return (
    <div className="exchangeRate">
    <h3 className='rateHeadLine'> Exchange Rate </h3>
    <h1 className='rateData' > {fullData.exchangeRate}</h1>
    <p className='pToP'>{fullData.primaryCurr} to {fullData.secondaryCurr}</p>
    </div>
  )

}

export default ExchangeRate