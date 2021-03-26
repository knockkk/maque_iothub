import request from '@/utils/request';
export async function login(params: API.LoginParams): Promise<any> {
  return request.post('/user/login', {
    data: params,
  });
}

export async function currentUser(): Promise<API.CurrentUser> {
  return request.get('/user');
}

export async function logout() {
  console.log('logout api');
  // return request.get('/user/logout');
}
