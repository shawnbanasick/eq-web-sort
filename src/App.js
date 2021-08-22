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
import styled, { ThemeProvider } from "styled-components";

const StyledFooter = React.lazy(() => import("./pages/footer/StyledFooter"));

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </div>
  );
}

export default view(App);

const theme = {
  primary: "#337ab7",
  secondary: "#285f8f",
  focus: "#63a0d4",
};
