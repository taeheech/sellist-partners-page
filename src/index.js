import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import GlobalStyle from "./Styles/GlobalStyle";

ReactDOM.render(
  <div>
    <GlobalStyle />
    <Routes />
  </div>,
  document.getElementById("root")
);
