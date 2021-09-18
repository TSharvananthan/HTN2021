import { Navbar } from "./components/index";
import "./styles/global.css";
import useSearchRestaurants from "./hooks/useSearchRestaurants";
import { useEffect } from "react";
import { Home } from "./pages/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  // FIXME: Just to test out the hooks
  const { data, status } = useSearchRestaurants({ location: "vancouver" });
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
          <Route exact path="/reviews"></Route>
          <Route exact path="/feedback"></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
