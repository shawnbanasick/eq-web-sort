import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./styles/globalCSS";
import styled, { ThemeProvider } from "styled-components";
import { Waiter } from "react-wait";
import axios from "axios";
import processConfigXMLData from "./utilities/processConfigXMLData";
import processMapXMLData from "./utilities/processMapXMLData";
import processLanguageXMLData from "./utilities/processLanguageXMLData";
import processStatementsXMLData from "./utilities/processStatementsXMLData";
// import getGlobalState from "./globalState/getGlobalState";
import setGlobalState from "./globalState/setGlobalState";
import globalState from "./globalState/globalState";

const convert = require("xml-js");

const App = React.lazy(() => import("./App"));

const theme = {
  primary: "#337ab7",
  secondary: "#285f8f",
  focus: "#63a0d4",
};

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
  font-style: italic;
  font-size: 35px;
`;

(async () => {
  await axios
    .get("./settings/language.xml", {
      "Content-Type": "application/xml; charset=utf-8",
    })
    .then(function (response) {
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const languageData = convert.xml2js(response.data, options);
      let languageObject = processLanguageXMLData(languageData);
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
  // console.log(JSON.stringify(globalState.languageObject));
})();

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense
      fallback={
        <StyledLoading>
          <h1>Loading ...</h1>
        </StyledLoading>
      }
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Waiter>
          <App />
        </Waiter>
      </ThemeProvider>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
