import axios from 'axios';
import { useQuery } from 'react-query';

const testReview = async review => {
  const { data } = await axios({
    method: 'POST',
    url: '/api/reviews',
    data: { review },
  });
  return data;
};

const useTestReview = (review, options = {}) => {
  const baseOptions = {
    onError: console.log,
    retry: 0,
  };

  return useQuery(['test', 'review'], () => testReview(review), {
    ...baseOptions,
    ...options,
  });
};

export default useTestReview;
