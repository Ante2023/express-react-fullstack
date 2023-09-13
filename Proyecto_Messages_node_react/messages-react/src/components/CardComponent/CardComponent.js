import React from "react";
import "./CardComponent.css";
const CardComponent = (props) => {
  // console.log(props);
  const [id, from, text, date] = [props.msg];
  // console.log(from);
  return (
    <div className="containerCard">
      <div className="fromDate">
        <h4 style={styles.colorTxt}>{props.msg.from}</h4>
        <h5 style={styles.colorTxt}>{props.msg.date}</h5>
      </div>
      <div className="containerText">
        <p className="textMessage" style={styles.text}>
          {props.msg.text}
        </p>
      </div>
      <h5 style={styles.idMenssage}>ID: {props.msg.id} </h5>
      <div>
        <button
          onClick={() => {
            // console.log(props.msg.id);
            props.handlerUpdateMsg(props.msg.id);
            // props.handlerSetFormOn(true)
          }}
          style={styles.btn}
        >
          Editar
        </button>
        <button
          onClick={() => props.handlerDeleteMsg(props.msg.id)}
          style={styles.btnDelete}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CardComponent;

const styles = {
  text: {
    fontSize: "15px",
    // backgroundColor: ""#ff4447"",
    color: "#006c84",
    textAlign: "left",
  },
  idMenssage: {
    // backgroundColor: "blue",
    textAlign: "right",
    marginRight: "10px",
    padding: "8px",
    color: "#006c84",
  },
  btn: {
    width: "120px",
    height: "35px",
  },
  btnDelete: {
    width: "120px",
    height: "35px",
    backgroundColor: "#006c84",
  },
  colorTxt: {
    color: "#006c84",
  },
};
