import { defineConfig } from 'umi';
import routes from './routes';
import layout from './layout';
export default defineConfig({
  routes,
  layout,
  fastRefresh: {},
  theme: {
    'primary-color': layout.primaryColor,
  },
  favicon: '/logo.svg',
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
