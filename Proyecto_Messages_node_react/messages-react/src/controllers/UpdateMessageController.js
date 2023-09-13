import React, { useEffect, useState } from "react";
import FormUpdateComponent from "../components/FormComponent/FormUpdateComponent";
import FindByIdMessages from "./FindByIdMessages";

export const UpdateMessageController = (props) => {
  const [updateOldMsg, setUpdateOldMsg] = useState(undefined);
  const [msgUpdated, setMsgUpdated] = useState(undefined);
  const [onForm, setOnForm] = useState(true)
  // const []
  const requestOptions = {
    method: "PUT",
    mode: "cors",
    headers: { "Content-Type": "application/json;charset=UTF-8",
            // 'Authorization': 'Bearer my-token',
            // 'My-Custom-Header': 'foobar'
          },
    body: JSON.stringify(msgUpdated),
  };
  useEffect(() => {
    fetch(`http://localhost:3001/messages/${props.id}`, requestOptions)
      .then((res) => res.json())
      // .then((data) => console.log(data));
  }, [requestOptions]);

  return (
    <div>
      <FindByIdMessages id={props.id} setUpdateOldMsg={setUpdateOldMsg} />(
      {updateOldMsg && (
        <FormUpdateComponent
          updateOldMsg={updateOldMsg}
          setMsgUpdated={setMsgUpdated}
          setControllerOn={props.setControllerOn}

        />
      )}
      )
    </div>
  );
};
