import { Navbar } from "./components/index";
import "./styles/global.css";
import { useEffect } from "react";
import { Home, Reviews, PageNotFound, Feedback } from "./pages/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import useSearchBusinesses from './hooks/useSearchBusinesses';

function App() {
  // FIXME: Just to test out the hooks

  const { data, status } = useSearchBusinesses({location: 'vancouver'});

  useEffect(() => {
    console.log(data);
  }, [status]);

  return (
  <div>
      <Router>
        <Navbar />

        <Switch>

          <Route exact={true} path="/">
            <Home />
          </Route>

          <Route exact={true} path="/reviews">
            <Reviews />
          </Route>

          <Route exact={true} path="/feedback">

          </Route>

          <Route component={PageNotFound} />

        </Switch>

      </Router>
    </div>
  );

}

export default App;
