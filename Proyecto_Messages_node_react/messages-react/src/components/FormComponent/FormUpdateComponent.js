import React, { useState } from "react";
import "./FormComponent.css";
const FormUpdateComponent = (props) => {
  const [from, setFrom] = useState(props.updateOldMsg.from);
  const [text, setText] = useState(props.updateOldMsg.text);

  const handleChangeInput = (event) => {
    if (event.target.name === "from") {
      // console.log(event.target.value);
      setFrom((from) => event.target.value);
    } else if (event.target.name === "text") {
      // console.log(event.target.value);
      setText((text) => event.target.value);
    }
  };
  const handleSubmitForm = (event) => {
    // console.log("eeeeeee");
    event.preventDefault();
    if (text !== undefined && from !== undefined) {
      props.setMsgUpdated({
        from: from,
        text: text,
        date: props.updateOldMsg.date,
      });
    }
  };
  return (
    <div className="containerForm">
      <div className="formContainer">
        <buttom
          style={{ backgroundColor: "red" }}
          onClick={() => {
            props.setControllerOn("list")
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
          <button style={styles.button}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default FormUpdateComponent;

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
