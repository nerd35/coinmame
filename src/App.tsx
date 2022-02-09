import Header from "./components/header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageRender from "./PageRender";
import {  useState } from "react";

function App() {
  const [user, setUser] = useState(null);


  // 
  return (
    <Router>
      <Header user={user} setUser={setUser}/>
      <Switch >
        <Route exact path="/" component={PageRender} />
        <Route exact path="/:page" component={PageRender} />
        <Route exact path="/:page/:slug" component={PageRender} />
      </Switch>
    </Router>
  );
}

export default App;
