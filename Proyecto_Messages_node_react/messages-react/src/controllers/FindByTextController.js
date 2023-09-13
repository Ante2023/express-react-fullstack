import React, { useState, useEffect } from "react";
import BodyComponent from "../components/BodyComponent/BodyComponent";

const FindByTextController = (props) => {
  const [messages, setMessages] = useState(undefined);

  useEffect(() => {
    fetch(`http://localhost:3001/messages/search?text=${props.searchMsg}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [props.searchMsg]);
  console.log(props);
  return (
    messages && (
      <BodyComponent
        msgs={messages}
        handlerDeleteMsg={props.handlerDeleteMsg}
        handlerUpdateMsg={props.handlerUpdateMsg}
      />
    )
  );
};

export default FindByTextController;
