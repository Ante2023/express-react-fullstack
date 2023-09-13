import React, { useEffect, useState } from "react";
import CardComponent from "./components/CardComponent";

const RandomController = (props) => {
  const [random, setRandom] = useState(undefined);
  const [reloadComponent, setReloadComponent] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/quotes/random`)
      // fetch(`http://localhost:5000/lodash/quotes/random`)
      .then((res) => res.json())
      .then((data) => {
        setRandom([data.quoteRandom]);
      });
    setReloadComponent(props.reload);
  }, [props.reload]);

  return random && <CardComponent quotesArray={random} />;
};

export default RandomController;
