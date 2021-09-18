import { Navbar } from "./components/index";
import "./styles/global.css";
import { Home } from "./pages/index"
function App() {
  return (
    <>
      <Navbar></Navbar>

      <div className="container">
        <Home></Home>
      </div>
    </>
  );
}

export default App;
