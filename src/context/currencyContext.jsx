import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [rates, setRates] = useState({ USD: 1 });

  // Load saved currency
  useEffect(() => {
    const stored = localStorage.getItem("currency");
    if (stored) setCurrency(stored);
  }, []);

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get("https://api.exchangerate.host/latest?base=USD");
        setRates(res.data.rates);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      }
    };
    fetchRates();
  }, []);

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  };

  const convertPrice = (priceInUSD) => {
    const rate = rates[currency] || 1;
    return (priceInUSD * rate).toFixed(2);
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, convertPrice, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
};
