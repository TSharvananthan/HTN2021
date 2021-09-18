
import { Navbar } from './components/index';
import './styles/global.css';
import useSearchRestaurants from './hooks/useSearchRestaurants';
import { useEffect } from 'react';
import { Home } from "./pages/index"

function App() {

  // FIXME: Just to test out the hooks
  const { data, status } = useSearchRestaurants({ location: 'vancouver' });
  useEffect(() => {
    console.log(data);
  }, [status]);

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
