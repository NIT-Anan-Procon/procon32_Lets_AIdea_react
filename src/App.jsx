import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./common/pages/css/style.css";
import Test from "./Test"; // TODO: 完成後消去
import Selection from "./common/pages/Selection";
import Waiting from "./common/pages/Waiting";
import Explanation from "./learn/pages/Explanation";
import LearnResult from "./learn/pages/Result";
import LearnVoting from "./learn/pages/Voting";
import LearnAward from "./learn/pages/Award";
import QuizDescription from "./quiz/pages/Description";
import QuizAnswer from "./quiz/pages/Answer";
import QuizResult from "./quiz/pages/Result";
import QuizVoting from "./quiz/pages/Voting";
import QuizAward from "./quiz/pages/Award";
import Library from "./library/Library";

export default function App() {
  useEffect(() => {
    const onUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onUnload);
    let key = false;
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey) key = true;
      if (
        ((e.which || e.keyCode) === 82 && key) ||
        (e.which || e.keyCode) === 13 ||
        (e.which || e.keyCode) === 116
      ) {
        e.preventDefault();
      }
    });
  });

  return (
    <BrowserRouter>
      <Route path="/" exact component={Test} /> {/* TODO: 完成後消去 */}
      <Route path="/selection" exact component={Selection} />
      <Route path="/waiting" exact component={Waiting} />
      <Route path="/library" exact component={Library} />
      <Route path="/learn/explanation" exact component={Explanation} />
      <Route path="/learn/result" exact component={LearnResult} />
      <Route path="/learn/voting" exact component={LearnVoting} />
      <Route path="/learn/award" exact component={LearnAward} />
      <Route path="/quiz/description" exact component={QuizDescription} />
      <Route path="/quiz/answer" exact component={QuizAnswer} />
      <Route path="/quiz/result" exact component={QuizResult} />
      <Route path="/quiz/voting" exact component={QuizVoting} />
      <Route path="/quiz/award" exact component={QuizAward} />
      <Route path="/library" exact component={Library} />
    </BrowserRouter>
  );
}
