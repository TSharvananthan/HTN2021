
import { Navbar } from "./components/index";
import "./styles/global.css";
import { useEffect } from "react";
import { Home ,Reviews} from "./pages/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import useSearchBusinesses from './hooks/useSearchBusinesses';


function App() {
  // FIXME: Just to test out the hooks

  const { data, status } = useSearchBusinesses({ location: 'vancouver' });

  useEffect(() => {
    console.log(data);
  }, [status]);

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/reviews">
<Reviews></Reviews>
          </Route>
          <Route exact path="/feedback"></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
