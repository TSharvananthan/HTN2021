import axios from 'axios';
import { useQuery } from 'react-query';

const searchReviews = async params => {
  const { data } = await axios({
    method: 'GET',
    url: '/api/reviews',
    params,
  });
  return data;
};

const useSearchReviews = (params = {}, options = {}) => {
  const baseOptions = {
    onError: console.log,
    retry: 0,
  };

  return useQuery(['search', 'reviews', JSON.stringify(params)], () => searchReviews(params), {
    ...baseOptions,
    ...options,
  });
};

export default useSearchReviews;
