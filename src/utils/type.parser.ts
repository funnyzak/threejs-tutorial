import { staticBaseURL } from '@/config/app.config';

/**
 * 转换静态地址
 * @param url 接口返回的地址
 * @returns
 */
export const parseStaticUrl = (url: string): string => {
  if (!url || url === null || url === '') return '';
  return url.startsWith('/')
    ? staticBaseURL + url
    : url.startsWith('@')
    ? staticBaseURL + url.substring(1)
    : url;
};
