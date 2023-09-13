import React, { useState, useEffect } from "react";
import BodyComponent from "../components/BodyComponent/BodyComponent";

const ListAllMessagesController = (props) => {
  // console.log("props.listAll", props.listAll);
  // const [deleteMsg, setDeleteMsg] = useState(undefined);
  // const [updateMsg, setUpdateMsg] = useState(undefined);

  const [listAllMsgs, setListAllMsgs] = useState(undefined);
  // const [reloadList, setReloadList] = useState(props.listAll);
  const requestOptions = {
    method: "GET",
    // headers: {
    //     'Authorization': 'Bearer my-token',
    //     'My-Custom-Header': 'foobar'
    // }
  };

  useEffect(() => {
    fetch(`http://localhost:3001/messages`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data);
        setListAllMsgs(data);
      });
  }, [props.listAll]);

  return (
    listAllMsgs && (
      <BodyComponent
        msgs={listAllMsgs}
        handlerDeleteMsg={props.handlerDeleteMsg}
        handlerUpdateMsg={props.handlerUpdateMsg}
        // handlerSetFormOn={props.handlerSetFormOn}
      />
    )
  );
};

export default ListAllMessagesController;

//https://jasonwatmore.com/post/2020/11/11/react-fetch-http-delete-request-examples
