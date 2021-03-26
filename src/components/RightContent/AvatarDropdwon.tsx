import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin, Dropdown } from 'antd';
import { useModel, history } from 'umi';
import styles from './index.less';
import { logout } from '@/apis/user';
import { removeToken } from '@/utils/storage';
const Loading = (
  <span className={`${styles.action} ${styles.account}`}>
    <Spin
      size="small"
      style={{
        marginLeft: 8,
        marginRight: 8,
      }}
    />
  </span>
);
const outlogin = async () => {
  await logout();
  const { query = {}, pathname } = history.location;
  const { redirect } = query;
  if (window.location.pathname !== '/login' && !redirect) {
    history.replace({
      pathname: '/login',
      search: `redirect=${pathname}`,
    });
  }
};
const AvatarDropdown: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  if (!initialState) {
    return Loading;
  }
  const { currentUser } = initialState;
  if (!currentUser || !currentUser.username) {
    return Loading;
  }

  const onMenuClick = (e: any) => {
    if (e.key === 'logout' && initialState) {
      setInitialState({ ...initialState, currentUser: undefined });
      removeToken();
      outlogin();
      return;
    }
  };
  const DropdownMenu = (
    <Menu className={styles.menu} onClick={onMenuClick}>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={DropdownMenu}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={
            currentUser.avatar ||
            'http://oss.aliyuncs.com/aliyun_id_photo_bucket/default_handsome.jpg'
          }
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{currentUser.username}</span>
      </span>
    </Dropdown>
  );
};

export default AvatarDropdown;
