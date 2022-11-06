import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
// https://jsonplaceholder.typicode.com/todos/1
// https://postman-echo.com/get?test=123

export default class BaseService {
  axiosInstance: Function;

  constructor() {
    /**
     * This function return a new axios instance with some default configs
     * and You can overwrite as well.
     * @param  {Object} [config={}] [description]
     * @return {[type]}             [description]
     */
    this.axiosInstance = (config: AxiosRequestConfig = {}): AxiosInstance => {
      const defaultConfig: AxiosRequestConfig = {
        // timeout: 20000, //20s
      };
      config = {...defaultConfig, ...config};
      const newAxios: AxiosInstance = axios.create(config);

      // Add a request interceptor
      newAxios.interceptors.request.use(
        async (moreConfig) => {
          return moreConfig;
        },
        function(error) {
          return Promise.reject(error);
        }
      );

      // Add a response interceptor
      newAxios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      return newAxios;
    };
  }
}
