import "./FooterComponent.css";
import React from "react";

const FooterComponent = () => {
  return (
    <div className="containerFooter">
      Autor: dent007@gmail.com
      {/* <p style={styles.email}>Autor: dent007@gmail.coms</p> */}
    </div>
  );
};

export default FooterComponent;

const styles = {
  email: {
    fontSize: "15px",
    color: "aliceblue",
  },
};
