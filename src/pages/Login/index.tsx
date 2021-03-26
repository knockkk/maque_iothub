import React from 'react';
import { message } from 'antd';
import Footer from '@/components/Footer';
import styles from './index.less';
import { history, useModel } from 'umi';
import Form from './Form';
import { login } from '@/apis/user';
import { setToken } from '@/utils/storage';
const Top = () => (
  <div className={styles.top}>
    <div className={styles.header}>
      <img alt="logo" className={styles.logo} src="/logo.svg" />
      <span className={styles.title}>Maque IotHub</span>
    </div>
    <div className={styles.desc}>Maque 物联网信息平台</div>
  </div>
);
/**
 * 此方法会跳转到 redirect 参数所在的位置
 * 在 logout 时可以保存当时页面url，以便在 login 时恢复之前的页面
 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as {
      redirect: string;
    };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      setInitialState({ ...initialState, currentUser: userInfo });
    }
  };

  const onSubmit = async (values: API.LoginParams) => {
    try {
      const res = await login(values);
      if (res.error) {
        message.error(res.error);
        return;
      }
      message.success('登录成功！');

      try {
        setToken(res.token || '');
      } catch (err) {
        message.error(err);
        return;
      }

      await fetchUserInfo();
      goto();
    } catch (error) {
      message.error(`登录失败(${JSON.stringify(error)})`);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.main}>
          <Top />
          <Form onSubmit={onSubmit} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
