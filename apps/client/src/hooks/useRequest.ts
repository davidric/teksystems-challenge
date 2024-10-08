import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { UseRequestConfig } from '../types';

axios.defaults.headers.common['Authorization'] = 'Bearer ACCESS_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const useRequest = <T>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendRequest = useCallback(async (config: UseRequestConfig<T>) => {
    setLoading(true);
    try {
      const response = await axios({
        ...config,
        method: config.method || 'GET',
        url: config.url,
        data: config.body,
      });
      setData(response.data);
      if (config.onSuccess) {
        config.onSuccess(response.data);
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      const error = axiosError?.response?.data || axiosError;
      if (config.onError) {
        config.onError(error as Error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, sendRequest };
};

export default useRequest;
