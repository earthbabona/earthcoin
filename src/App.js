import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import PriceCard from './PriceCard';
let logo = "https://tradingplatforms.com/pt/wp-content/uploads/sites/27/2021/04/dogecoin-logo3.svg";

function App() {

  const [ticker, setTicker] = useState({
    low: 0,
    high: 0,
    last: 0
  })

  useEffect(() => {
    async function getDogecoinPrice(){
      const { data } = await axios.get('https://nitinr-cors.herokuapp.com/https://api.wazirx.com/api/v2/tickers/dogeusdt');
      setTicker(data.ticker);
    }
    getDogecoinPrice();
    const interval = setInterval (() => getDogecoinPrice(), 10000);
    return () => {
      clearInterval(interval);
    }
    
  }, [])

  

  return (
    <div className="App">
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>สวัสดีเหล่านักลงทุน!</strong> ราคา Dogecoin จะอัพเดททุก 10 วินาที.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <img src={logo} width="150" height="150" alt="dogecoin"/>
      <h1 className="title">Live Dogecoin Price By.Tennyson🔥</h1>
      <h5 className="subtitle">Dogecoin to the moon 🚀</h5>
      
      <div className="prices-container">
        <PriceCard type="low" price={ticker.low}/>
        <PriceCard type="high" price={ticker.high}/>
        <PriceCard type="current" price={ticker.last}/>
      </div>
    </div>
  );
}

export default App;
