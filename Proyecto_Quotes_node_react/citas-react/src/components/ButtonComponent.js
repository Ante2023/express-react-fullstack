import React from "react";
import "./ButtonComponent.css";

const ButtonComponent = (props) => {
  // console.log(props);
  return (
    <div
      onClick={() => props.onClickHandler()}
      className="button"
      style={{ backgroundColor: props.color, cursor: "pointer" }}
    >
      {props.title}
    </div>
  );
};

export default ButtonComponent;
