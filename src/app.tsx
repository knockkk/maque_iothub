import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import logo from '../public/logo.svg';
import { currentUser as queryCurrentUser } from './apis/user';

// umi layout配置 https://umijs.org/zh-CN/plugins/plugin-layout
export const layout = () => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    logo,
  };
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrentUser();
      if (!currentUser || !currentUser.username) {
        history.push('/login');
        return undefined;
      }
      return currentUser;
    } catch (err) {
      history.push('/login');
    }
    return undefined;
  };

  if (history.location.pathname !== '/user/login') {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
    };
  }
  return {
    fetchUserInfo,
  };
}
