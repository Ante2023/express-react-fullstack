import "./App.css";
import ButtonComponent from "./components/ButtonComponent";
import CardComponent from "./components/CardComponent";
import React, { useEffect, useState } from "react";
import InputComponent from "./components/InputComponent";

function App() {
  const [quote, setQuote] = useState(undefined);
  const [randomQuote, setRandomQuote] = useState(
    "http://localhost:5000/quotes"
  );

  useEffect(() => {
    fetch(randomQuote)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setQuote(data);
      });
  }, [randomQuote]);

  const handlerRandonQuote = () => {
    setRandomQuote("http://localhost:5000/quotes/random");
    console.log(quote);
  };

  const handlerSearchQuote = () => {
    console.log("handlerSearchQuote");
  };
  // console.log(quote.date);
  return (
    <div className="App-header">
      <div className="container-buttons">
        <ButtonComponent
          onClickHandler={handlerRandonQuote}
          color="rgba(72, 154, 208, 0.944)"
          title="Random Quote"
        />
        <div className="button-input">
          <ButtonComponent
            onClickHandler={handlerSearchQuote}
            color="rgb(36, 71, 94)"
            title="Serch Quote"
          />
          <InputComponent />
        </div>
      </div>
      {quote && (
        <div>
          <CardComponent dateQuote={quote.date} quotesArray={quote.quotes} />
        </div>
      )}
    </div>
  );
}

export default App;
