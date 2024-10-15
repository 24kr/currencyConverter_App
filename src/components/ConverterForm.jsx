import { useEffect, useState } from "react";
import CurrencySelect from "./CurrencySelect";

const ConverterForm = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("RWF");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertRate, setAlertRate] = useState(null); // For rate alerts
  const [historicalRates, setHistoricalRates] = useState([]); // For historical exchange rates
  const [dateRange, setDateRange] = useState({ start: '', end: '' }); // Date range for historical data

  // Function to swap the currency selection
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Function to fetch the exchange rate and update the result
  const getExchangeRate = async () => {
    const API_KEY = "75129a2a4f85ae32c3d4ac22";
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw Error("Something went wrong!");

      const data = await response.json();
      const rate = (data.conversion_rate * amount).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);

      // Check for rate alert trigger
      if (alertRate && rate >= alertRate) {
        alert(`Alert: ${fromCurrency} to ${toCurrency} has reached your target rate of ${alertRate}`);
      }
    } catch (error) {
      console.error(error);
      setResult("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch historical rates
  const getHistoricalRates = async () => {
    const API_KEY = "75129a2a4f85ae32c3d4ac22";
    const { start, end } = dateRange;
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/history/${fromCurrency}/${toCurrency}/${start}/${end}`;

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setHistoricalRates(data.rates); // Handle historical data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => getExchangeRate, []);

  return (
    <form className="mt-12 px-4 md:px-8 lg:px-12" onSubmit={(e) => { e.preventDefault(); getExchangeRate(); }} id="converterForm" name="converterForm">
      <div className="flex flex-col mb-8">
        <label className="text-blue-900 font-medium block mb-2 text-lg dark:text-blue-200" name="labelamnt">Enter Amount</label>
        <input
          type="number"
          className="outline-none text-2xl p-[15px] w-full sm:max-w-md text-blue-900 font-medium min-h-11 rounded-md bg-gradient-to-br border-solid border-2 border-sky-200 dark:text-blue-200 dark:border-sky-900"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          id="amount"
          name="amount"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 items-center justify-between">
        <div className="form-section w-full sm:w-1/2 mb-4 sm:mb-0">
          <label className="text-blue-900 font-medium block mb-2 text-lg dark:text-blue-200" name="from">From</label>
          <CurrencySelect selectedCurrency={fromCurrency} handleCurrency={(e) => setFromCurrency(e.target.value)} />
        </div>
        <div
          className="h-10 w-12 flex mt-4 sm:mt-8 items-center justify-center rounded-full border-solid border-2 border-sky-400 transition ease-out hover:bg-sky-200 dark:hover:bg-sky-700 cursor-pointer"
          onClick={handleSwapCurrencies}
        >
          <svg width="16" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                            fill="#0ea5e9"
                        />
                    </svg>
                </div>

                <div className="form-section w-full sm:w-1/2">
          <label className="text-blue-900 font-medium block mb-2 text-lg dark:text-blue-200" name="to">To</label>
          <CurrencySelect selectedCurrency={toCurrency} handleCurrency={(e) => setToCurrency(e.target.value)} />
        </div>
      </div>

      <button
        type="submit"
        className={`${isLoading ? "loading" : ""} w-full rounded-md border-none transition ease-out hover:bg-gradient-to-tl outline-none font-medium text-xl p-3 mt-5 mb-5 text-center items-center text-blue-900 bg-sky-50 dark:text-blue-200 dark:bg-sky-900`}
      >
        Get Exchange Rate
      </button>

      <p className="from-sky-300 text-blue-900 font-semibold p-3 rounded-md dark:text-blue-100 tracking-tighter bg-gradient-to-tl text-xl text-center items-center">
        {isLoading ? "Getting exchange rate..." : result}
      </p>

      <div className="mt-4">
        <label className="text-blue-900 font-medium block mb-2 text-lg dark:text-blue-200">Set Rate Alert</label>
        <input
          className="outline-none text-lg p-[15px] w-full sm:max-w-md text-blue-900 font-light min-h-9 rounded-md bg-gradient-to-bl border-solid border-2 border-sky-200 dark:text-blue-200 dark:border-sky-900 placeholder-slate-400"
          type="number"
          value={alertRate || ''}
          onChange={(e) => setAlertRate(e.target.value)}
          placeholder="Enter target rate"
        />
      </div>

         <p className="text-lg text-blue-900 dark:text-blue-200 mt-4">
                {isLoading ? "Loading..." : result}
            </p>
      <div className="mt-4 justify-between items-center">
        <label className="text-blue-900 font-medium block mb-2 text-lg dark:text-blue-200">Historical Date Range</label>
        <input
          className="m-1 rounded-sm p-1 dark:text-blue-100 dark:bg-gradient-to-bl dark:from-sky-300 dark:to-blue-950"
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        />
        <input
          className="m-1 rounded-sm p-1 dark:text-blue-100 dark:bg-gradient-to-bl dark:from-sky-300 dark:to-blue-950"
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />
        <button
          type="button"
          className="rounded-md border-sky-500 px-3 transition ease-out bg-gradient-to-br outline-none font-medium text-md p-1 m-5 text-center items-center text-blue-900 dark:text-blue-200 dark:hover:bg-sky-900"
          onClick={getHistoricalRates}
        >
          Get Historical Rates
        </button>
      </div>

      {/* Historical Rates Display */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200">Historical Exchange Rates:</h3>
        {historicalRates.length > 0 ? (
          <ul className="list-disc pl-6">
            {historicalRates.map((rate, index) => (
              <li key={index} className="text-blue-900 dark:text-blue-200">
                {`Date: ${rate.date}, Rate: ${rate.rate}`}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-blue-500 dark:text-blue-400">No historical data available for the selected range.</p>
        )}
      </div>
    </form>
  );
};

export default ConverterForm;
