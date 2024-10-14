import PropTypes from "prop-types";

// Array of currency codes
const currencyCodes = [
  // List of currency codes
      "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
    "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
    "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
    "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP",
    "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS",
    "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF",
    "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
    "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT",
    "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
    "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
    "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
    "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR",
    "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD",
    "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY",
    "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES",
    "VND", "VUV", "WST", "XAF", "XCD", "XOF", "XPF", "YER", "ZAR", "ZMW",
];

const CurrencySelect = ({ selectedCurrency, handleCurrency }) => {
  // Extract the country code from the selected currency code
  const countryCode = selectedCurrency.substring(0, 2);

  return (
    <div className="flex flex-row p-3 max-w-30 min-h-10 items-center rounded-md border-solid border-2 border-sky-300 dark:border-sky-900">
      <img src={`https://flagsapi.com/${countryCode}/flat/64.png`} alt="Flag" className="w-6 rounded-full" />
      <select
        onChange={handleCurrency}
        className="cursor-pointer outline-none border-none bg-transparent text-blue-900 text-sm font-medium pt-0 pr-3 pb-0 pl-2 dark:text-blue-300"
        value={selectedCurrency}
      >
        {currencyCodes.map(currency => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
    </div>
  );
};

CurrencySelect.propTypes = {
  selectedCurrency: PropTypes.string.isRequired,
  handleCurrency: PropTypes.func.isRequired
};

export default CurrencySelect;
