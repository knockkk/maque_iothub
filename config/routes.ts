export default [
  { path: '/login', layout: false, component: './Login' },
  {
    path: '/admin',
    name: '设备管理',
    icon: 'crown',
    hideInBreadcrumb: true,
    routes: [
      {
        path: '/admin/product',
        name: '产品',
        component: './Product',
      },
      {
        path: '/admin/product/detail/:productKey',
        name: '产品详情',
        component: './ProductDetail',
        hideInMenu: true,
        hideInBreadcrumb: true,
      },
      {
        path: '/admin/device',
        name: '设备',
        component: './Device',
      },
      {
        path: '/admin/device/detail/:deviceKey',
        name: '设备详情',
        component: './DeviceDetail',
        hideInMenu: true,
        hideInBreadcrumb: true,
      },
    ],
  },
  {
    path: '/',
    redirect: '/admin/product',
  },
  {
    component: './404',
  },
];
