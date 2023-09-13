import React, { useState } from "react";
import "./MenuBarComponent.css";
const MenuBarComponent = (props) => {
  const [searchMsg, setSearchMsg] = useState(undefined);
  const handlerSearchInput = (event) => {
    setSearchMsg(event.target.value);
  };

  const handlerBtnearch = () => {
    if (searchMsg) {
      props.handlerFindByText(searchMsg);
    }
    setSearchMsg("");
  };
  return (
    <div className="ContainerMenu">
      <div className="buttonsLeft">
        <button>Listar mensajes cada 30"</button>
        <button onClick={() => props.setControllerOn("lisftThen")}>
          Listar 10 últimos mensajes
        </button>
      </div>
      <div className="buttonsRight">
        <input onChange={handlerSearchInput} value={searchMsg} type="text" />
        <button onClick={() => handlerBtnearch()}>Buscar</button>
      </div>
    </div>
  );
};

export default MenuBarComponent;

const styles = {
  btnSegundos: {
    paddingLeft: "10px",
  },
  btnUltimos: {
    height: "50px",
  },
};
