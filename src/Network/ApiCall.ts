import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppConfig } from './AppConfig';
import Loader from '../Utils/AppLoader';

const axiosInstance = Axios.create({
  baseURL: AppConfig.baseUrl,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    console.log(`axios request : ${config?.url} =>`, config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response) => {
    Loader.isLoading(false);
    console.log(`<= Response : ${response?.config?.url} : Status - ${response?.status} `, response);
    return response;
  },
  async (error) => {
    Loader.isLoading(false);
    console.log(`<= Response Error : ${error?.config?.url} : Status - ${error?.status} `, error);
    return Promise.reject(error);
  },
);

export interface APICallParams {
  method?: 'get' | 'post' | 'put' | 'delete';
  payload?: any;
  url: string;
}

const APICall = async <T>({
  method = 'post',
  payload = null,
  url = '',
}: APICallParams): Promise<AxiosResponse<T>> => {
  Loader.isLoading(true);
  const config: AxiosRequestConfig = {
    method: method.toLowerCase(),
    timeout: 1000 * 60 * 2,
    url,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (payload && method.toLowerCase() === 'get') {
    config.params = payload;
  } else if (payload && method.toLowerCase() === 'post') {
    config.data = payload;
  }

  return new Promise((resolve, reject) => {
    axiosInstance(config)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data?.error) {
            reject({
              statusCode: error.response,
              data: {
                ...error.response.data,
                message: error?.response?.data?.error,
              },
            });
          }
          reject(error);
        }
        reject({
          statusCode: 500,
          data: { message: error.message ?? error.error ?? 'Something went wrong!' },
        });
      });
  });
};

export default APICall;
