import axios from 'axios';
import { useQuery } from 'react-query';

const searchRestaurants = async params => {
  const { data } = await axios({
    method: 'GET',
    url: '/api/restaurants',
    params,
  });
  return data;
};

const useSearchRestaurants = (params = {}, options = {}) => {
  const baseOptions = {
    onError: console.log,
    retry: 0,
  };

  return useQuery(['search', 'restaurants', JSON.stringify(params)], () => searchRestaurants(params), {
    ...baseOptions,
    ...options,
  });
};

export default useSearchRestaurants;
