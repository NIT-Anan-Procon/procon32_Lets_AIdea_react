import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Result from "./learn/Result";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path="/result" exact component={Result} />
      </div>
    </BrowserRouter>
  );
}

export default App;
