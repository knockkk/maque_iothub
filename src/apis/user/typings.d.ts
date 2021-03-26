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
}
