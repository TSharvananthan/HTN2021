import axios from 'axios';
import { useQuery } from 'react-query';

const fetchLocations = async () => {
  const { data } = await axios({
    method: 'GET',
    url: '/api/locations',
  });
  return data;
};

const useFetchLocations = (options = {}) => {
  const baseOptions = {
    onError: console.log,
    retry: 0,
  };

  return useQuery(['locations', 'all'], fetchLocations, {
    ...baseOptions,
    ...options,
  });
};

export default useFetchLocations;
