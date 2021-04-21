import { Tabs } from 'antd';
import { history } from 'umi';
import { useState, useEffect } from 'react';
import RunStatus from './RunStatus';
import { getProductFunc } from '@/apis/user';

const { TabPane } = Tabs;
export default () => {
  const [tabKey, setTabKey] = useState('status');
  const [funcArr, setFuncArr] = useState<API.FuncDef[]>([]);
  useEffect(() => {
    requestFuncArr();
  }, []);
  const requestFuncArr = async () => {
    const query = history.location.query;
    const productKey = (query && (query.pk as string)) || '';
    try {
      const arr = await getProductFunc(productKey);
      setFuncArr(arr);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Tabs
      activeKey={tabKey}
      onChange={(key) => setTabKey(key)}
      size="small"
      type="card"
    >
      <TabPane tab="运行状态" key="status">
        <RunStatus statusArr={funcArr} />
      </TabPane>
      <TabPane tab="事件管理" key="event">
        事件管理
      </TabPane>
      <TabPane tab="服务调用" key="service">
        服务调用
      </TabPane>
    </Tabs>
  );
};
