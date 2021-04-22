import { Tabs } from 'antd';
import BasicFrom from './BasicForm';
import PwdForm from './PwdForm';
import styles from './index.less';

const { TabPane } = Tabs;

export default () => (
  <div className={styles.container}>
    <Tabs defaultActiveKey="basic" size="large" tabPosition="left">
      <TabPane tab="基本设置" key="basic">
        <div className={styles.tabContainer}>
          <div className={styles.title}>基本设置</div>
          <div className={styles.formBox}>
            <BasicFrom />
          </div>
        </div>
      </TabPane>
      <TabPane tab="修改密码" key="pwd">
        <div className={styles.tabContainer}>
          <div className={styles.title}>修改密码</div>
          <div className={styles.formBox}>
            <PwdForm />
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
);
