import axios from 'axios';
import { useQuery } from 'react-query';

const searchBusinesses = async params => {
  const { data } = await axios({
    method: 'GET',
    url: '/api/businesses',
    params,
  });
  return data;
};

const useSearchBusinesses = (params = {}, options = {}) => {
  const baseOptions = {
    onError: console.log,
    retry: 0,
  };

  return useQuery(['search', 'businesses', JSON.stringify(params)], () => searchBusinesses(params), {
    ...baseOptions,
    ...options,
  });
};

export default useSearchBusinesses;
