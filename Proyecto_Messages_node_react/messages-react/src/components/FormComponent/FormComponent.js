import React, { useState } from "react";
import "./FormComponent.css";
const FormComponent = (props) => {
  const [from, setFrom] = useState(undefined);
  const [text, setText] = useState(undefined);

  const handleChangeInput = (event) => {
    if (event.target.name === "from") {
      setFrom(event.target.value);
    } else if (event.target.name === "text") {
      setText(event.target.value);
    }
  };
  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (text !== undefined && from !== undefined) {
      props.handlerSetMessage({
        from: from,
        text: text,
        date: new Date().toISOString(),
      });
      setFrom("");
      setText("");
      props.changeStateSenMessage();
    }
  };
  return (
    <div className="containerForm">
      <div className="formContainer">
        <buttom
          style={{ backgroundColor: "red" }}
          onClick={() => {
            // console.log("sssdddd");
            props.handlerSetFormOn(false);
          }}
        >
          cerrar
        </buttom>
        <form className="form" onSubmit={handleSubmitForm}>
          <h5 style={{ marginBottom: "20px" }}>
            Formulario para agregar mensajess
          </h5>
          <div style={styles.inputContainer}>
            <label style={{ padding: "10px" }}>From: </label>
            <input
              type="text"
              style={styles.input}
              name="from"
              value={from}
              onChange={handleChangeInput}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.labelText}>Texto: </label>
            <textarea
              style={styles.textarea}
              name="text"
              value={text}
              onChange={handleChangeInput}
            ></textarea>
          </div>
          {/* <button style={styles.button}> */}
          <button style={styles.button}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;

const styles = {
  input: {
    height: "35px",
    width: "500px",
    textAlign: "center",
    backgroundColor: "aliceblue",
  },
  textarea: {
    height: "80px",
    width: "500px",
    fontSize: "18px",
    backgroundColor: "aliceblue",
  },
  button: {
    height: "35px",
    marginTop: "10px",
  },
  inputContainer: {
    marginTop: "10px",
    display: "flex",
  },
  labelText: {
    buttom: "50px",
    padding: "10px",
  },
};
