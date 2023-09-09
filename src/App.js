import React, { Suspense, useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
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
import LoadingScreen from "./pages/landing/LoadingScreen";
// import PromptUnload from "./utilities/PromptUnload";
import StyledFooter from "./pages/footer/StyledFooter";
import useSettingsStore from "./globalState/useSettingsStore";
import useStore from "./globalState/useStore";
import cloneDeep from "lodash/cloneDeep";
// import iOS from "./isIos";

const convert = require("xml-js");

const getSetConfigObj = (state) => state.setConfigObj;
const getSetLangObj = (state) => state.setLangObj;
const getSetMapObj = (state) => state.setMapObj;
const getSetStatementsObj = (state) => state.setStatementsObj;
const getSetColumnStatements = (state) => state.setColumnStatements;
const getSetResetColumnStatements = (state) => state.setResetColumnStatements;
const getSetSurveyQuesObjArray = (state) => state.setSurveyQuestionObjArray;
const getSetRequiredAnswersObj = (state) => state.setRequiredAnswersObj;
const getSetDataLoaded = (state) => state.setDataLoaded;
const getDisplayGoodbyeMessage = (state) => state.displayGoodbyeMessage;
const getDisableRefreshCheck = (state) => state.disableRefreshCheck;

function App() {
  // STATE
  const [isLoading, setLoading] = useState(true);

  const setConfigObj = useSettingsStore(getSetConfigObj);
  const setLangObj = useSettingsStore(getSetLangObj);
  const setMapObj = useSettingsStore(getSetMapObj);
  const setStatementsObj = useSettingsStore(getSetStatementsObj);
  const setColumnStatements = useSettingsStore(getSetColumnStatements);
  const setResetColumnStatements = useSettingsStore(
    getSetResetColumnStatements
  );
  const setSurveyQuestionObjArray = useSettingsStore(getSetSurveyQuesObjArray);
  const setRequiredAnswersObj = useSettingsStore(getSetRequiredAnswersObj);
  const setDataLoaded = useStore(getSetDataLoaded);
  const displayGoodbyeMessage = useStore(getDisplayGoodbyeMessage);
  const disableRefreshCheck = useStore(getDisableRefreshCheck);

  useEffect(() => {
    const unloadCallback = (event) => {
      const e = event || window.event;
      //console.log(e)
      e.preventDefault();
      if (e) {
        e.returnValue = "";
      }
      return "";
    };

    if (displayGoodbyeMessage || disableRefreshCheck) {
      window.removeEventListener("beforeunload", unloadCallback);
    } else {
      window.addEventListener("beforeunload", unloadCallback);
      return () => {
        //cleanup function
        window.removeEventListener("beforeunload", unloadCallback);
      };
    }
  }, [displayGoodbyeMessage, disableRefreshCheck]);

  useEffect(() => {
    let shuffleCards;
    let vColsObj;

    (async () => {
      await axios
        .get("./settings/language.xml", {
          "Content-Type": "application/xml; charset=utf-8",
        })
        .then(function (response) {
          const options = { compact: true, ignoreComment: true, spaces: 4 };
          const languageData = convert.xml2js(response.data, options);
          let langObj = processLanguageXMLData(languageData);
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
          setSurveyQuestionObjArray(info.surveyQuestionObjArray);
          setRequiredAnswersObj(info.requiredAnswersObj);
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
          vColsObj = data.vColsObj;
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
            shuffleCards,
            vColsObj
          );
          setColumnStatements(statementsObj.columnStatements);
          const resetColumnStatements = cloneDeep(
            statementsObj.columnStatements
          );
          setResetColumnStatements(resetColumnStatements);
          setStatementsObj(statementsObj);
        })
        .catch(function (error) {
          console.log(error);
        });

      setDataLoaded(true);

      setTimeout(() => {
        // setIsDataLoaded(true);
        setLoading(false);
      }, 700);
    })();
  }, [
    setConfigObj,
    setLangObj,
    setStatementsObj,
    setColumnStatements,
    setRequiredAnswersObj,
    setSurveyQuestionObjArray,
    setMapObj,
    setDataLoaded,
    setResetColumnStatements,
  ]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <Router>
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

export default App;
