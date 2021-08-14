import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/landing/Landing";
import PostsortPage from "./pages/postsort/Postsort";
import PresortPage from "./pages/presort/Presort";
import SortPage from "./pages/sort/Sort";
import SubmitPage from "./pages/submit/Submit";
import SurveyPage from "./pages/survey/Survey";
import { view } from "@risingstack/react-easy-state";
import StyledFooter from "./pages/footer/StyledFooter.jsx";
import NoPageFound from "./utilities/NoPageFound";
import axios from "axios";
import { useEffect } from "react";
import processConfigXMLData from "./utilities/processConfigXMLData";
import processMapXMLData from "./utilities/processMapXMLData";
import processLanguageXMLData from "./utilities/processLanguageXMLData";
import processStatementsXMLData from "./utilities/processStatementsXMLData";

const convert = require("xml-js");

function App() {
  useEffect(() => {
    axios
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

    axios
      .get("./settings/language.xml", {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then(function (response) {
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const languageData = convert.xml2js(response.data, options);
        // console.log(JSON.stringify(languageData));
        processLanguageXMLData(languageData);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
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

    axios
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
  }, []);

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
        <StyledFooter />
      </Router>
    </div>
  );
}

export default view(App);
