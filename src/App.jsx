import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Test from "./Test"; // TODO: 完成後消去
import Explanation from "./learn/Explanation";
import LearnResult from "./learn/Result";
import QuizDescription from "./quiz/Description";
import QuizAnswer from "./quiz/Answer";
import QuizResult from "./quiz/Result";
import QuizVoting from "./quiz/Voting";
import QuizAward from "./quiz/Award";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Test} /> {/* TODO: 完成後消去 */}
      <Route path="/explanation" exact component={Explanation} />
      <Route path="/result" exact component={LearnResult} />
      <Route path="/quiz/description" exact component={QuizDescription} />
      <Route path="/quiz/answer" exact component={QuizAnswer} />
      <Route path="/quiz/result" exact component={QuizResult} />
      <Route path="/quiz/voting" exact component={QuizVoting} />
      <Route path="/quiz/award" exact component={QuizAward} />
    </BrowserRouter>
  );
}
