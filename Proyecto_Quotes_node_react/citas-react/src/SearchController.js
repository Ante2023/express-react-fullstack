import React, { useState, useEffect } from "react";
import CardComponent from "./components/CardComponent";

const SearchController = (props) => {
  const [quote, setQuote] = useState(undefined);
  // console.log(props);

  useEffect(() => {
    fetch(`http://localhost:5000/quotes/search?term=${props.success}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setQuote(data);
      });
  }, [props.success]);
  // console.log(quote);
  // return <h1>ff</h1>;
  return quote && <CardComponent quotesArray={quote.quotes} />;
};

export default SearchController;
