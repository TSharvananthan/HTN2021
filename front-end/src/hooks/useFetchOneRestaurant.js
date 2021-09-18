import axios from 'axios';
import { useQuery } from 'react-query';

const fetchRestaurant = async restaurantId => {
  const { data } = await axios({
    method: 'GET',
    url: `/api/restaurants/${restaurantId}`,
  });
  return data;
};

const useFetchOneRestaurant = (restaurantId, options = {}) => {
  const baseOptions = {
    enabled: !!restaurantId,
    onError: console.log,
    retry: 0,
  };

  return useQuery(['restaurant', restaurantId], () => fetchRestaurant(restaurantId), {
    ...baseOptions,
    ...options,
  });
};

export default useFetchOneRestaurant;
