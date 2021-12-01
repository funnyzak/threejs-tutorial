import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders,
  AxiosInstance,
  Method
} from 'axios';
import { queryString } from '@/utils';

export type RequestBefore = (config: AxiosRequestConfig) => AxiosRequestConfig;
export type ResponseHook = (response: AxiosResponse<unknown, any>) => any;

export default class AxiosRequest {
  requestConfig: AxiosRequestConfig<any>;

  requestBefore?: RequestBefore;

  responseHook?: ResponseHook;

  constructor(
    requestConfig?: AxiosRequestConfig<any>,
    requestBefore?: RequestBefore,
    responseHook?: ResponseHook
  ) {
    this.requestConfig = requestConfig && requestConfig !== null ? requestConfig : this.defaultConfig();
    this.requestBefore = requestBefore;
    this.responseHook = responseHook;
  }

  defaultConfig(): AxiosRequestConfig {
    return {
      baseURL: '',
      timeout: 36000000,
      withCredentials: true
    };
  }

  requestContentTypeHeader(contentType?: string): AxiosRequestHeaders {
    return !contentType ? {} : { 'content-type': contentType };
  }

  createInstance(): AxiosInstance {
    const service = axios.create(this.requestConfig);

    service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        config = this.requestBefore && this.requestBefore !== null ? this.requestBefore(config) : config;

        const headers: AxiosRequestHeaders = config.headers ? config.headers : {};
        headers['X-Requested-With'] = 'XMLHttpRequest';
        config.headers = headers || {};

        return config;
      },
      (error: any) => Promise.reject(new Error('请求超时'))
    );

    service.interceptors.response.use(
      (response: AxiosResponse<unknown, any>) => new Promise<any>((resolve, reject) => {
        if (response.status === 200) {
          if (this.responseHook && this.responseHook !== null) {
            return resolve(this.responseHook(response));
          }
          return resolve(response.data);
        }
        switch (response.status) {
          case 401:
            return reject(new Error('无此权限'));
          case 403:
            return reject(new Error('禁止访问'));
          case 404:
            return reject(new Error('接口不存在'));
          case 500:
            return reject(new Error('接口发送了异常'));
          case 504:
            return reject(new Error('代理接口服务不可用'));
          case 502:
            return reject(new Error('接口代理出错'));
          default:
            return reject(new Error('请求失败'));
        }
      }),
      (error: any) => Promise.reject(error)
    );
    return service;
  }

  request(
    url: string,
    method: Method,
    params?: Record<string, string>,
    data?: any,
    contentType?: string
  ) {
    return this.createInstance().request({
      url,
      method,
      params: queryString(params),
      headers: this.requestContentTypeHeader(contentType),
      data
    });
  }

  get(
    url: string,
    params?: Record<string, string>,
    contentType?: string
  ): Promise<AxiosResponse<unknown, any>> {
    return this.request(url, 'GET', params, null, contentType);
  }

  del(
    url: string,
    params?: Record<string, string>,
    contentType?: string
  ): Promise<AxiosResponse<unknown, any>> {
    return this.request(url, 'DELETE', params, null, contentType);
  }

  post(
    url: string,
    params?: Record<string, string>,
    data?: any,
    contentType?: string
  ): Promise<AxiosResponse<unknown, any>> {
    return this.request(url, 'POST', params, data, contentType);
  }

  put(
    url: string,
    params?: Record<string, string>,
    data?: any,
    contentType?: string
  ): Promise<AxiosResponse<unknown, any>> {
    return this.request(url, 'PUT', params, data, contentType);
  }
}
