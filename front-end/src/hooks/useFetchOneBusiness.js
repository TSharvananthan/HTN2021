import axios from 'axios';
import { useQuery } from 'react-query';

const fetchBusiness = async businessId => {
  const { data } = await axios({
    method: 'GET',
    url: `/api/businesses/${businessId}`,
  });
  return data;
};

const useFetchOneBusiness = (businessId, options = {}) => {
  const baseOptions = {
    enabled: !!businessId,
    onError: console.log,
    retry: 0,
  };

  return useQuery(['business', businessId], () => fetchBusiness(businessId), {
    ...baseOptions,
    ...options,
  });
};

export default useFetchOneBusiness;
