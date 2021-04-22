export default [
  { path: '/login', layout: false, component: './Login' },
  {
    path: '/',
    exact: true,
    redirect: '/analysis',
  },
  {
    path: '/analysis',
    name: '统计分析',
    icon: 'dashboard',
    component: './Analysis',
  },
  {
    path: '/',
    name: '设备管理',
    icon: 'setting',
    routes: [
      {
        path: '/product',
        name: '产品',
        component: './Product',
      },
      {
        path: '/product/detail/:productKey',
        name: '产品详情',
        component: './ProductDetail',
        hideInMenu: true,
        hideInBreadcrumb: true,
      },
      {
        path: '/device',
        name: '设备',
        component: './Device',
      },
      {
        path: '/device/detail',
        name: '设备详情',
        component: './DeviceDetail',
        hideInMenu: true,
        hideInBreadcrumb: true,
      },
    ],
  },
  {
    component: './404',
  },
];
