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
import StyledFooter from "./pages/footer/StyledFooter";
import useSettingsStore from "./globalState/useSettingsStore";
import useStore from "./globalState/useStore";
import cloneDeep from "lodash/cloneDeep";
import shuffle from "lodash/shuffle";
import convert from "xml-js";
import ConsentPage from "./pages/consent/Consent";
// import detectMobileBrowser from "./utilities/detectMobileBrowser";
import MobileFooter from "./pages/footer/MobileFooter";
// import MobilePresortPage from "./pages/presort/MobilePresort";

const getConfigObj = (state) => state.configObj;
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
const getCurrentPage = (state) => state.currentPage;

function App() {
  // STATE
  const [isLoading, setLoading] = useState(true);
  const configObj = useSettingsStore(getConfigObj);

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
  const currentPage = useStore(getCurrentPage);

  useEffect(() => {
    const unloadCallback = (event) => {
      const e = event || window.event;
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

  // useEffect(() => {
  //   const unloadEvent = (event) => {
  //     const e = event || window.event;
  //     e.preventDefault();
  //     if (e) {
  //       e.returnValue = "";
  //     }
  //     return "";
  //   };

  //   if (displayGoodbyeMessage) {
  //       // reset localStorage
  //       let submitted = localStorage.getItem("submitted");
  //       if (currentPage === "submit" && submitted === "true") {
  //         let urlUsercode = localStorage.getItem("urlUsercode");
  //         localStorage.clear();
  //         localStorage.setItem("urlUsercode", urlUsercode);
  //       } else {
  //         window
  //       }
  //     }

  useEffect(() => {
    let shuffleCards;
    let vColsObj;
    let imagesArray = [];

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

          if (info.configObj.useImages === true) {
            for (let i = 0; i < info.configObj.numImages; i++) {
              let item = {};
              item.backgroundColor = "white";
              item.element = (
                // eslint-disable-next-line
                <img
                  src={`/settings/images/image${i + 1}.${
                    info.configObj.imageFileType
                  }`}
                  alt={`image${i + 1}`}
                  className="dragObject"
                />
              );
              item.cardColor = "yellowSortCard";
              item.divColor = "isUncertainStatement";
              item.pinkChecked = false;
              item.yellowChecked = true;
              item.greenChecked = false;
              item.sortValue = 222;
              item.id = `image${i + 1}`;
              item.statement = `image${i + 1}`;
              item.statementNum = `${i + 1}`;

              imagesArray.push(item);
            }

            if (info.configObj.shuffleCards === true) {
              const shuffledCards = shuffle(imagesArray);
              imagesArray = [...shuffledCards];
            }
          }
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
          // add for images setup
          statementsObj.columnStatements.imagesList = imagesArray;
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

      await setDataLoaded(true);
      await setLoading(false);
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

  if (configObj.useMobileMode === true || configObj.useMobileMode === "true") {
    let isMobile = false; // let isMobile = detectMobileBrowser();
    if (isMobile) {
      console.log("Mobile Mode");
      return (
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route component={NoPageFound} />
            </Switch>
            <Suspense>
              <MobileFooter />
            </Suspense>
          </Router>
        </div>
      );
    }
  }

  if (
    configObj.showConsentPage === true ||
    configObj.showConsentPage === "true"
  ) {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={ConsentPage} />
            <Route exact path="/presort" component={PresortPage} />
            <Route exact path="/sort" component={SortPage} />
            <Route exact path="/postsort" component={PostsortPage} />
            <Route exact path="/survey" component={SurveyPage} />
            <Route exact path="/submit" component={SubmitPage} />
            <Route exact path="/landing" component={LandingPage} />
            <Route component={NoPageFound} />
          </Switch>
          <Suspense>
            <StyledFooter />
          </Suspense>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/presort" component={PresortPage} />
            <Route exact path="/sort" component={SortPage} />
            <Route exact path="/postsort" component={PostsortPage} />
            <Route exact path="/survey" component={SurveyPage} />
            <Route exact path="/submit" component={SubmitPage} />
            <Route component={NoPageFound} />
          </Switch>
          <Suspense>
            <StyledFooter />
          </Suspense>
        </Router>
      </div>
    );
  }
}

export default App;
