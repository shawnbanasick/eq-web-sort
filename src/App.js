import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { LandingPage } from './pages/landing/Landing';
import { PostsortPage } from './pages/postsort/Postsort';
import { PresortPage } from './pages/presort/Presort';
import { SortPage } from './pages/sort/Sort';
import { SubmitPage } from './pages/submit/Submit';
import { SurveyPage } from './pages/survey/Survey';
import { view } from '@risingstack/react-easy-state';

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
        <ul>
          <li>
            <Link to="/">Landing</Link>
          </li>
          <li>
            <Link to="/presort">Presort</Link>
          </li>
          <li>
            <Link to="/sort">Sort</Link>
          </li>
          <li>
            <Link to="/postsort">Postsort</Link>
          </li>
          <li>
            <Link to="/survey">Survey</Link>
          </li>
          <li>
            <Link to="/submit">Submit</Link>
          </li>
         </ul> 
      </Router>
    </div>
  );
}

export default view(App);
