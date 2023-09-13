import React, { useState, useEffect } from "react";
import BodyComponent from "../components/BodyComponent/BodyComponent";

const ListTenMessagesController = (props) => {
  const [tenMessages, setTenMessages] = useState(undefined);
  useEffect(() => {
    fetch(` http://localhost:3001/messages/latest`)
      .then((res) => res.json())
      .then((data) => setTenMessages(data));
  });
  return (
    tenMessages && (
      <BodyComponent
        msgs={tenMessages}
        handlerDeleteMsg={props.handlerDeleteMsg}
        handlerUpdateMsg={props.handlerUpdateMsg}
        // handlerSetFormOn={props.handlerSetFormOn}
      />
    )
  );
};

export default ListTenMessagesController;
