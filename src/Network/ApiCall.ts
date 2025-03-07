/* eslint-disable no-unsafe-finally */
import Axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
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
    console.log(`<= Response : ${response?.config?.url} : Status - ${response?.status} `, response);
    Loader.isLoading(false);
    return response;
  },
  async (error) => {
    try {
      console.log(`<= Response : ${error?.config?.url} : Status - ${error?.status} `, error);
      return Promise.reject(error);
    } catch (err) {
      console.log('Error in axios interceptor response: ', err);
      return Promise.reject(err);
    } finally {
      Loader.isLoading(false);
    }
  },
);

export interface APICallParams {
  method?: 'get' | 'post' | 'put' | 'delete';
  payload?: any;
  url: string;
  headers?: AxiosRequestHeaders;
  removeLoader?: boolean;
}

const APICall = async <T>({
  method = 'post',
  payload = null,
  url = '',
  headers = {} as AxiosRequestHeaders,
  removeLoader = false,
}: APICallParams): Promise<AxiosResponse<T>> => {
  if (!removeLoader) {
    Loader.isLoading(true);
  }

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
  console.log('API details: ', method, payload, url);

  return new Promise((resolve, reject) => {
    axiosInstance(config)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        if (error.response) {
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
