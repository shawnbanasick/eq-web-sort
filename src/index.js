import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./styles/globalCSS";
import axios from "axios";
import processConfigXMLData from "./utilities/processConfigXMLData";
import processMapXMLData from "./utilities/processMapXMLData";
import processLanguageXMLData from "./utilities/processLanguageXMLData";
import processStatementsXMLData from "./utilities/processStatementsXMLData";
import setGlobalState from "./globalState/setGlobalState";
import { ThemeProvider } from "styled-components";
const convert = require("xml-js");
const App = React.lazy(() => import("./App"));

const theme = {
  primary: "#337ab7",
  secondary: "#285f8f",
  focus: "#63a0d4",
};

(async () => {
  await axios
    .get("./settings/language.xml", {
      "Content-Type": "application/xml; charset=utf-8",
    })
    .then(function (response) {
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const languageData = convert.xml2js(response.data, options);
      let languageObject = processLanguageXMLData(languageData);
      setGlobalState("languageObject", languageObject);
      localStorage.setItem("langObj", JSON.stringify(languageObject));
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios
    .get("./settings/config.xml", {
      "Content-Type": "application/xml; charset=utf-8",
    })
    .then(function (response) {
      const options = { compact: false, ignoreComment: true, spaces: 2 };
      const configData = convert.xml2js(response.data, options);
      processConfigXMLData(configData);
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios
    .get("./settings/map.xml", {
      "Content-Type": "application/xml; charset=utf-8",
    })
    .then(function (response) {
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const mapData = convert.xml2js(response.data, options);
      processMapXMLData(mapData);
    })
    .catch(function (error) {
      console.log(error);
    });

  await axios
    .get("./settings/statements.xml", {
      "Content-Type": "application/xml; charset=utf-8",
    })
    .then(function (response) {
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const statementsData = convert.xml2js(response.data, options);
      processStatementsXMLData(statementsData);
    })
    .catch(function (error) {
      console.log(error);
    });
  setGlobalState("dataLoaded", true);
})();

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<h1>Loading ...</h1>}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
