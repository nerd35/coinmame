import Header from "./components/header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageRender from "./PageRender";

function App() {
  // 
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={PageRender} />
        <Route exact path="/:page" component={PageRender} />
        <Route exact path="/:page/:slug" component={PageRender} />
      </Switch>
    </Router>
  );
}

export default App;
