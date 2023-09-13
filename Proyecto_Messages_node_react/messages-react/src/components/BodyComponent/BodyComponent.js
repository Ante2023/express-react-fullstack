import React, { useState, useEffect } from "react";
import "./BodyComponent.css";
import CardComponent from "../CardComponent/CardComponent";

export const BodyComponent = (props) => {
  return (
    <div className="containerBody">
      {props.msgs.map((msg, key) => (
        <CardComponent
          key={key}
          msg={msg}
          setDeleteMsg={props.setDeleteMsg}
          setUpdateMsg={props.setUpdateMsg}
          handlerDeleteMsg={props.handlerDeleteMsg}
          handlerUpdateMsg={props.handlerUpdateMsg}
          handlerSetFormOn={props.handlerSetFormOn}
        />
      ))}
    </div>
  );
};
export default BodyComponent;
