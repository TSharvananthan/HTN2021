import { Navbar } from './components/index';
import './styles/global.css';
import useSearchRestaurants from './hooks/useSearchRestaurants';
import { useEffect } from 'react';

function App() {

  // FIXME: Just to test out the hooks
  const { data, status } = useSearchRestaurants({ location: 'vancouver' });
  useEffect(() => {
    console.log(data);
  }, [status]);

  return (
    <>
      <Navbar />
      <div className='container'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut dignissimos aliquid dolor earum
        reiciendis, neque deleniti, aper
      </div>
    </>
  );
}

export default App;
