import "./QuoteComponent.css";
import React from "react";

const QuoteComponent = (props) => {
  // console.log(props.objectQuote);
  // console.log(props.objectQuote.quote);
  return (
    <div className="container">
      <p className="message">
        <img src="comillas.png" width={25} alt="comillas" />
        {props.objectQuote.quote}
      </p>
      <p className="container-author">
        <span>Author:</span> {props.objectQuote.author}
      </p>
    </div>
  );
};

export default QuoteComponent;
