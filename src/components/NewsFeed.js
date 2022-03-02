import React, { useEffect, useState } from 'react'
import axios from 'axios'

//Using axios to fetch crypto news api
const NewsFeed = () => {
  //Setting the artciles first as null
  const [reads, setReads] = useState(null)

  useEffect(()=> {

    const axios = require("axios").default;

    var options = {
      method: 'GET',
      url: 'https://crypto-news-live3.p.rapidapi.com/news',
      headers: {
        'x-rapidapi-host': 'crypto-news-live3.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
      }
    }
    
    axios.request(options).then((response)  => {
      console.log(response.data);
      //Filling the articles state with response.datas
      setReads(response.data)
    }).catch((error) => {
      console.error(error);
    })
  

  }, [])

  //Getting just the first nine
  const nineNews = reads?.slice(0,9)
  // printing the title and url only
  return (
    <div className='news-feed'>
    <h2 className='newsFeed-h1'>News Feed</h2>
    {nineNews?.map((article, index) => (
      <div key={index}>
       <a href={article.url}>  <p> {article.title} </p>  </a> 
      </div>))}
    </div>
  )
} 

export default NewsFeed