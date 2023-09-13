import React, { useState, useEffect } from "react";
import FormComponent from "../components/FormComponent/FormComponent";

const CreateMessageController = (props) => {
  const [message, setMessage] = useState(undefined);
  const [sendMessage, setSednMessage] = useState(true);
  // console.log(message);
  const changeStateSenMessage =()=>{
    setSednMessage(true)
  }
  const requestBody = {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify(message),
  };
  useEffect(() => {
    if (message && sendMessage) {
      fetch(`http://localhost:3001/messages`, requestBody)
        .then((res) => res.json())
        .then((data) => {
          setSednMessage(false);
          // console.log(data);
          props.listAllMsgs();
        })
        .catch((e) => console.log("error", e));
    }
  }, [requestBody]);

  return (
    <FormComponent
      // handlerListAll={props.listAllMsgs}
      handlerSetMessage={setMessage}
      handlerSetFormOn={props.handlerSetFormOn}
      changeStateSenMessage={changeStateSenMessage}
    />
  );
};

export default CreateMessageController;
