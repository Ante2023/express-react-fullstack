import React from "react";
import "./HeaderComponent.css";

const HeaderComponent = (props) => {
  return (
    <div className="ContainerHeader">
      <p
        style={{ cursor: "pointer" }}
        onClick={() => props.setControllerOn("list")}
      >
        Migracode Foro
      </p>
    </div>
  );
};

export default HeaderComponent;
