import "./App.css";
import ListController from "./ListController";
import RandomController from "./RandomController";
import SearchController from "./SearchController";
import ButtonComponent from "./components/ButtonComponent";
import InputComponent from "./components/InputComponent";
import React, { useState } from "react";

function App() {
  const [controllerOn, setControllerOn] = useState("list");
  const [reload, setreload] = useState(false);

  const handlerRandonQuote = () => {
    setControllerOn("random");
    setreload(!reload);
  };

  /* INICIO Gestion de filtrado de quotes desde input */
  const [searchQuoteInput, setSearchQuoteInput] = useState("");
  const [lettersQuoteInput, setLettersQuoteInput] = useState("");

  const handlerSearchQuoteBtn = () => {
    setControllerOn("search");
    if (lettersQuoteInput) {
      setSearchQuoteInput(lettersQuoteInput);
    }
    setLettersQuoteInput("");
  };

  const handlerSearchQuoteInp = (event) => {
    // console.log(event.target.value);
    setLettersQuoteInput(event.target.value);
  };
  /* FIN Gestion de filtrado de quotes desde input */

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
            onClickHandler={handlerSearchQuoteBtn}
            color="rgb(36, 71, 94)"
            title="Serch Quote"
          />
          <InputComponent
            onChange={handlerSearchQuoteInp}
            value={lettersQuoteInput}
          />
        </div>
      </div>

      {controllerOn === "list" && <ListController />}
      {controllerOn === "random" && <RandomController reload={reload} />}
      {controllerOn === "search" && <SearchController success={searchQuoteInput}/>}
    </div>
  );
}
export default App;
