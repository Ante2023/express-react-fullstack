import "./App.css";
import React, { useState } from "react";

import AddMessageComponent from "./components/AddMessageComponent/AddMessageComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import MenuBarComponent from "./components/MenuBarComponent/MenuBarComponent";
import ListAllMessagesController from "./controllers/ListAllMessagesController";
import CreateMessageController from "./controllers/CreateMessageController";
import DeleteMessageController from "./controllers/DeleteMessageController";
import { UpdateMessageController } from "./controllers/UpdateMessageController";
import ListTenMessagesController from "./controllers/ListTenMessagesController";
import FindByTextController from "./controllers/FindByTextController";

function App() {
  const [formOn, setFormOn] = useState(false);
  const [listAll, setListAll] = useState(false);
  const [controllerOn, setControllerOn] = useState("list");
  const [id, setId] = useState(undefined);
  const [searchMsg, setSearchMsg] = useState(undefined);

  const handlerListAll = () => {
    setListAll((listAll) => !listAll);
  };
  const handlerDeleteMsg = (id) => {
    setControllerOn("delete");
    setId(id);
    // console.log("id", id);
  };
  const handlerUpdateMsg = (id) => {
    setControllerOn("update");
    // console.log(controllerOn);
    setId(id);
    // setFormOn(true)
  };

  const handlerFindByText = (txt) => {
    setControllerOn("findByText");
    setSearchMsg(txt);
  };
  return (
    <div className="App">
      <HeaderComponent setControllerOn={setControllerOn}/>
      {formOn && (
        <CreateMessageController
          listAllMsgs={handlerListAll}
          handlerSetFormOn={setFormOn}
        />
      )}
      <MenuBarComponent
        setControllerOn={setControllerOn}
        handlerFindByText={handlerFindByText}
      />
      {controllerOn === "lisftThen" && (
        <ListTenMessagesController
          handlerDeleteMsg={handlerDeleteMsg}
          handlerUpdateMsg={handlerUpdateMsg}
          handlerSetFormOn={setFormOn}
        />
      )}
      {controllerOn === "findByText" && (
        <FindByTextController
          searchMsg={searchMsg}
          handlerDeleteMsg={handlerDeleteMsg}
          handlerUpdateMsg={handlerUpdateMsg}
          // handlerSetFormOn={setFormOn}
        />
      )}

      {controllerOn === "list" && (
        <ListAllMessagesController
          handlerDeleteMsg={handlerDeleteMsg}
          handlerUpdateMsg={handlerUpdateMsg}
          listAll={listAll}
          handlerSetFormOn={setFormOn}
        />
      )}
      {controllerOn === "delete" && (
        <DeleteMessageController setControllerOn={setControllerOn} id={id} />
      )}
      {controllerOn === "update" && (
        <UpdateMessageController setControllerOn={setControllerOn} id={id} />
      )}
      <AddMessageComponent handlerSetFormOn={setFormOn} />
      <FooterComponent />
    </div>
  );
}

export default App;
