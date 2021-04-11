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
    deviceNum?: number;
    funcArr?: FuncDef[];
  };
  type FuncDef = {
    funcType?: string;
    funcName?: string;
    funcKey?: string;
    dataType?: string;
    definition?: Object;
    unit?: string;
    description?: string;
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
  type Device = {
    productKey?: string;
    deviceName?: string;
    deviceSecret?: string;
    status?: string;
    connction?: object;
    connected?: boolean | string;
    lastOnlineTime?: number | string;
  };
  type CreateDevice = {
    productKey: string;
    deviceName: string;
  };
}
