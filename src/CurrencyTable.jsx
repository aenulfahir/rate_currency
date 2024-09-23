import React, { useState, useEffect } from "react";  
import axios from "axios";  
import "./CurrencyTable.css";  

const CurrencyTable = () => {  
  const [rates, setRates] = useState({});  
  const [loading, setLoading] = useState(true);  
  const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];  

  useEffect(() => {  
    const fetchRates = async () => {  
      try {  
        const response = await axios.get(  
          `https://api.currencyfreaks.com/latest?apikey=YOUR_API_KEY&symbols=${currencies.join(',')}`  
        );  
        setRates(response.data.rates);  
        setLoading(false);  
      } catch (error) {  
        console.error('Error fetching currency rates:', error);  
        setLoading(false);  
      }  
    };  

    fetchRates();  
  }, []);  

  const formatNumber = (number, decimalPlaces = 4) => {  
    return number  
      ? number.toLocaleString('en-US', {  
          minimumFractionDigits: decimalPlaces,  
          maximumFractionDigits: decimalPlaces,  
        })  
      : 'N/A';  
  };  

  const calculateWeBuy = (rate) => rate ? formatNumber(parseFloat(rate) * 1.05) : 'N/A';  
  const calculateWeSell = (rate) => rate ? formatNumber(parseFloat(rate) * 0.95) : 'N/A';  

  if (loading) {  
    return <div>Loading...</div>;  
  }  

  return (  
    <div className="currency-table-container">  
      <table className="currency-table">  
        <thead>  
          <tr>  
            <th>Currency</th>  
            <th>We Buy</th>  
            <th>Exchange Rate</th>  
            <th>We Sell</th>  
          </tr>  
        </thead>  
        <tbody>  
          {currencies.map((currency) => (  
            <tr key={currency}>  
              <td>{currency}</td>  
              <td>{calculateWeBuy(rates[currency])}</td>  
              <td>{rates[currency] ? parseFloat(rates[currency]).toFixed(4) : 'N/A'}</td>  
              <td>{calculateWeSell(rates[currency])}</td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
    </div>  
  );  
};  

export default CurrencyTable;  