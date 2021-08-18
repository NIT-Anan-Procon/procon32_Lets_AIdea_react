import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import Explanation from "../quiz/Explanation";
import Answer from "../quiz/Answer";
import Result from "../quiz/Result";
import Voting from "../quiz/Voting";
import Award from "../quiz/Award";

export default function App() {
  return (
      <BrowserRouter>
        <Route path="/explanation" exact component={Explanation}/>
        <Route path="/answer" exact component={Answer}/>
        <Route path="/result" exact component={Result}/>
        <Route path="/voting" exact component={Voting}/>
        <Route path="/award" exact component={Award}/>
      </BrowserRouter>
  );
}