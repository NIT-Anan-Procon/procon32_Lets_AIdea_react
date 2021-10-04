import { createBrowserHistory } from "history";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./common/pages/css/style.css";
import Test from "./Test";
import Login from "./common/pages/Login";
import Selection from "./common/pages/Selection";
import Waiting from "./common/pages/Waiting";
import LearnAward from "./learn/pages/Award";
import Explanation from "./learn/pages/Explanation";
import LearnResult from "./learn/pages/Result";
import LearnVoting from "./learn/pages/Voting";
import Library from "./library/Library";
import QuizAnswer from "./quiz/pages/Answer";
import QuizAward from "./quiz/pages/Award";
import QuizDescription from "./quiz/pages/Description";
import Relay from "./quiz/pages/Relay";
import QuizResult from "./quiz/pages/Result";
import QuizVoting from "./quiz/pages/Voting";

export default function App() {
  const customization = createBrowserHistory({ basename: "/" });
  return (
    <BrowserRouter history={customization}>
      <Route path="/" exact component={Login} />
      <Route path="/test" exact component={Test} />
      <Route path="/selection" exact component={Selection} />
      <Route path="/waiting" exact component={Waiting} />
      <Route path="/learn/explanation" exact component={Explanation} />
      <Route path="/learn/result" exact component={LearnResult} />
      <Route path="/learn/voting" exact component={LearnVoting} />
      <Route path="/learn/award" exact component={LearnAward} />
      <Route path="/quiz/description" exact component={QuizDescription} />
      <Route path="/quiz/relay" exact component={Relay} />
      <Route path="/quiz/answer" exact component={QuizAnswer} />
      <Route path="/quiz/result" exact component={QuizResult} />
      <Route path="/quiz/voting" exact component={QuizVoting} />
      <Route path="/quiz/award" exact component={QuizAward} />
      <Route path="/library" exact component={Library} />
    </BrowserRouter>
  );
}
