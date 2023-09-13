import React, { useEffect, useState } from "react";
import CardComponent from "./components/CardComponent";

const ListController = () => {
  const [quote, setQuote] = useState(undefined);
  useEffect(() => {
    fetch(`http://localhost:5000/quotes`)
      .then((res) => res.json())
      .then((data) => {
        setQuote(data);
      });
  }, []);

  return (
    quote && (
      <div>
        <CardComponent quotesArray={quote.quotes} />
      </div>
    )
  );
};

export default ListController;
