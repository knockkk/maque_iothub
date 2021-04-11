import request from '@/utils/request';
export async function login(params: API.LoginParams): Promise<any> {
  return request.post('/user/login', {
    data: params,
  });
}

export async function currentUser(): Promise<API.CurrentUser> {
  return request.get('/user');
}

export async function getProducts(): Promise<API.Product[]> {
  return request.get('/product');
}

export async function getProduct(productKey: string): Promise<API.Product> {
  return request.get(`/product/${productKey}`);
}

export async function createProduct(data: API.CreateProduct) {
  return request.post('/product', {
    data,
  });
}

export async function updateProduct(data: API.UpdateProduct) {
  return request.post('/product/update', {
    data,
  });
}

export async function deleteProduct(productKey: string) {
  return request.delete(`/product/${productKey}`);
}

export async function getProductFunc(productKey: string) {
  return request.get(`/product/getFunc/${productKey}`);
}

export async function addProductFunc(productKey: string, funcObj: API.FuncDef) {
  return request.post(`/product/addFunc`, {
    data: {
      productKey,
      funcObj,
    },
  });
}
export async function deleteProductFunc(productKey: string, funcKey: string) {
  return request.post(`/product/deleteFunc`, {
    data: {
      productKey,
      funcKey,
    },
  });
}
