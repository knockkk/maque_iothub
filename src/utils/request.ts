import { extend } from 'umi-request';
import { getToken } from './storage';

const extendRequest = extend({
  prefix: '/api',
  timeout: 5000,
});
extendRequest.interceptors.request.use(
  (url, options: any) => {
    options.headers['Authorization'] = getToken();
    return {
      url,
      options: { ...options, interceptors: true },
    };
  },
  { global: false },
);
export default extendRequest;
