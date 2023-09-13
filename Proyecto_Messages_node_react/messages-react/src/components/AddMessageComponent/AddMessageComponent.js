import React from "react";
import "./AddMessageComponent.css";

const AddMessageComponent = (props) => {
  return (
    <div className="contenedorAdd">
      <p
        onClick={() => {
          props.handlerSetFormOn(true);
        }}
        style={styles.newMessage}
      >
        Add
      </p>
    </div>
  );
};

export default AddMessageComponent;

const styles = {
  newMessage: {
    color: "#e2e8e4",
    fontSize: "20px",
    paddinRight: "200px",
  },
};
