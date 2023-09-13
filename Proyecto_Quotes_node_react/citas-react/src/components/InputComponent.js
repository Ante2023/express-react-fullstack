import React from "react";

const InputComponent = (props) => {
  // console.log(props);
  return (
    <div>
      {" "}
      <input
        style={styles.input}
        type="text"
        // name={props.name}
        value={props.value}
        placeholder="Buscar palabra"
        onChange={props.onChange}
      />
    </div>
  );
};

export default InputComponent;
const styles = {
  conteinerInput: {
    marginLeft: 60,
    padding: 7,
  },
  input: {
    height: "50px",
    width: "180px",
    fontSize: "25px",
    marginLeft: "1px",
    backgroundColor: "rgb(82 114 135)",
    paddingLeft: "7px",
  },
};
