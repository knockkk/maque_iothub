import { extend } from 'umi-request';
import { getToken } from './storage';
import { message } from 'antd';

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

type TStatus = 200 | 502 | 503 | 504;
extendRequest.interceptors.response.use((response) => {
  const codeMaps = {
    400: '请求参数错误',
    401: '未授权，请尝试登录',
    403: '无权限，请尝试重新登录',
    500: '服务器错误',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };
  const status = response.status as TStatus;
  if (status !== 200) {
    const errMsg = codeMaps[status] || '服务器错误';
    message.error(errMsg);
    return Promise.reject(response);
  }
  return response;
});

export default extendRequest;
