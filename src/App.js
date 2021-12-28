import React, { Suspense, useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { view } from "@risingstack/react-easy-state";
import LandingPage from "./pages/landing/Landing";
import PostsortPage from "./pages/postsort/Postsort";
import PresortPage from "./pages/presort/Presort";
import SortPage from "./pages/sort/Sort";
import SubmitPage from "./pages/submit/Submit";
import SurveyPage from "./pages/survey/Survey";
import NoPageFound from "./utilities/NoPageFound";
import axios from "axios";
import processConfigXMLData from "./utilities/processConfigXMLData";
import processMapXMLData from "./utilities/processMapXMLData";
import processLanguageXMLData from "./utilities/processLanguageXMLData";
import processStatementsXMLData from "./utilities/processStatementsXMLData";
import setGlobalState from "./globalState/setGlobalState";
import LoadingScreen from "./pages/landing/LoadingScreen";
import PromptUnload from "./utilities/PromptUnload";
import StyledFooter from "./pages/footer/StyledFooter";
import useSettingsStore from "./globalState/useSettingsStore";

const convert = require("xml-js");

function App() {
  // STATE
  const [isLoading, setLoading] = useState(true);

  const setConfigObj = useSettingsStore((state) => state.setConfigObj);
  const setLangObj = useSettingsStore((state) => state.setLangObj);
  const setMapObj = useSettingsStore((state) => state.setMapObj);
  const setStatementsObj = useSettingsStore((state) => state.setStatementsObj);

  useEffect(() => {
    let shuffleCards;

    (async () => {
      await axios
        .get("./settings/language.xml", {
          "Content-Type": "application/xml; charset=utf-8",
        })
        .then(function (response) {
          const options = { compact: true, ignoreComment: true, spaces: 4 };
          const languageData = convert.xml2js(response.data, options);
          let langObj = processLanguageXMLData(languageData);
          // localStorage.setItem("langObj", JSON.stringify(langObj));
          setGlobalState("langObj", langObj);
          setLangObj(langObj);
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
          let info = processConfigXMLData(configData);
          shuffleCards = info.shuffleCards;
          setConfigObj(info.configObj);
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
          let data = processMapXMLData(mapData);
          setMapObj(data.mapObj);
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
          const statementsObj = processStatementsXMLData(
            statementsData,
            shuffleCards
          );
          setGlobalState("columnStatements", statementsObj.columnStatements);
          setStatementsObj(statementsObj);
        })
        .catch(function (error) {
          console.log(error);
        });

      setGlobalState("dataLoaded", true);
      setTimeout(() => {
        // setIsDataLoaded(true);
        setLoading(false);
      }, 700);
    })();
  }, [setConfigObj, setLangObj, setStatementsObj, setMapObj]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <Router>
        <PromptUnload />
        <Switch>
          <Route exact path="/presort" component={PresortPage} />
          <Route exact path="/sort" component={SortPage} />
          <Route exact path="/postsort" component={PostsortPage} />
          <Route exact path="/survey" component={SurveyPage} />
          <Route exact path="/submit" component={SubmitPage} />
          <Route exact path="/" component={LandingPage} />
          <Route component={NoPageFound} />
        </Switch>
        <Suspense>
          <StyledFooter />
        </Suspense>
      </Router>
    </div>
  );
}

export default view(App);
