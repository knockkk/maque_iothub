declare namespace API {
  type CurrentUser = {
    username?: string;
    avatar?: string;
    userid?: string;
    email?: string;
  };
  type LoginParams = {
    username?: string;
    password?: string;
  };
  type Product = {
    createAt?: number;
    description?: string;
    productKey?: string;
    productName?: string;
  };
  type ProductDetail = {
    createAt?: number;
    description?: string;
    productKey?: string;
    productName?: string;
  };
  type CreateProduct = {
    productName: string;
    description: string;
  };
  type UpdateProduct = {
    productKey: string;
    productName: string;
    description: string;
  };
}
