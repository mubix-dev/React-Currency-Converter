import { useState, useEffect } from "react";
import { InputBox } from "./components";
import useCurrency from "./hooks/useCurrency";

function App() {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("pkr");

  const currencies = useCurrency(from);
  const options = Object.keys(currencies);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convertion = () => {
    setConvertedAmount(amount * currencies[to]);
  };

  useEffect(() => {
    if (currencies && currencies[to]) {
      setConvertedAmount(amount * currencies[to]);
    }
  }, [amount, from, to, currencies]);

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/4025825/pexels-photo-4025825.jpeg')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-xs bg-white/10 ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convertion();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount.toFixed(2)}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectedCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-gray-500 text-white px-2 py-0.5 hover:bg-gray-900"
                onClick={swap}
              >
                Swap ↓↑
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount.toFixed(2)}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                amountDisable
              />
            </div>
            {/* <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
