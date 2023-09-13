import React, { useState, useEffect } from "react";

const DeleteMessageController = (props) => {

  const [id, setId] = useState(undefined);
  useEffect(() => {
    const requestOptions = {
      method: "DELETE",
      // headers: {
      //     'Authorization': 'Bearer my-token',
      //     'My-Custom-Header': 'foobar'
      // }
    };
    fetch(`http://localhost:3001/messages/${props.id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          props.setControllerOn("list");
          // console.log(data);
        }
      });
    // console.log("id", props.id);
  }, [props.id]);
  return <></>;
};

export default DeleteMessageController;
