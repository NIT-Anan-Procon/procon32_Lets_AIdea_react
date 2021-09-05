import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Test from "./Test"; // TODO: 完成後消去
import Explanation from "./learn/Explanation";
import LearnResult from "./learn/Result";
import Description from "./quiz/Description";
import Answer from "./quiz/Answer";
import QuizResult from "./quiz/Result";
import Voting from "./quiz/Voting";
import Award from "./quiz/Award";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Test} /> {/* TODO: 完成後消去 */}
      <Route path="/explanation" exact component={Explanation} />
      <Route path="/result" exact component={LearnResult} />
      <Route path="/description" exact component={Description} />
      <Route path="/answer" exact component={Answer} />
      <Route path="/result" exact component={QuizResult} />
      <Route path="/voting" exact component={Voting} />
      <Route path="/award" exact component={Award} />
    </BrowserRouter>
  );
}
