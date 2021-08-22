import { HashRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/landing/Landing";
import PostsortPage from "./pages/postsort/Postsort";
import PresortPage from "./pages/presort/Presort";
import SortPage from "./pages/sort/Sort";
import SubmitPage from "./pages/submit/Submit";
import SurveyPage from "./pages/survey/Survey";
import { view } from "@risingstack/react-easy-state";
import NoPageFound from "./utilities/NoPageFound";
import React, { Suspense } from "react";
import getGlobalState from "./globalState/getGlobalState";

const StyledFooter = React.lazy(() => import("./pages/footer/StyledFooter"));

function App() {
  const dataLoaded = getGlobalState("dataLoaded");
  if (dataLoaded) {
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
  } else {
    return null;
  }
}

export default view(App);
