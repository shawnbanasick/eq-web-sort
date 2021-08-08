import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LandingPage } from "./pages/landing/Landing";
import { PostsortPage } from "./pages/postsort/Postsort";
import { PresortPage } from "./pages/presort/Presort";
import { SortPage } from "./pages/sort/Sort";
import { SubmitPage } from "./pages/submit/Submit";
import { SurveyPage } from "./pages/survey/Survey";
import { view } from "@risingstack/react-easy-state";
// import styled from "styled-components";
import globalState from "./globalState/globalState";
import NextButton from "./pages/NextButton";

const getNextPage = () => {
  const currentPage = globalState.currentPage;
  console.log(currentPage);
  if (currentPage === "landing") {
    return `/presort`;
  }
  if (currentPage === "presort") {
    return `/sort`;
  }
  if (currentPage === "sort") {
    return `/postsort`;
  }
  if (currentPage === "postsort") {
    return `/submit`;
  }

  return `/`;
};

function App() {
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
        </Switch>
        <footer>
          <NextButton to={getNextPage()}>
            {window.languageXML.nextButtonText}
          </NextButton>
        </footer>
      </Router>
    </div>
  );
}

export default view(App);

// const FooterDiv = styled.div`
//   display: inline;
// `;

// const NextButton = styled.button`
//   background: blue;
//   color: white;
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border-radius: 3px;
//   text-decoration: none;
//   float: right;
// `;
