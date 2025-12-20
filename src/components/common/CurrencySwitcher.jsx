import React from "react";
// import { useCurrency } from "../context/CurrencyContext";
import { useCurrency } from "../../context/currencyContext";

const currencies = [
  { code: "USD", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", flag: "🇬🇧" },
  { code: "NGN", symbol: "₦", flag: "🇳🇬" },
];

const CurrencySwitcher = () => {
  const { currency, changeCurrency } = useCurrency();

  return (
    <select
      className="border-none rounded-md outline-none focus:ring-0 text-sm"
      value={currency}
      onChange={(e) => changeCurrency(e.target.value)}
    >
      {currencies.map((c) => (
        <option key={c.code} value={c.code} className="text-sm">
           {c.code} ({c.symbol})
        </option>
      ))}
    </select>
  );
};

export default CurrencySwitcher;
