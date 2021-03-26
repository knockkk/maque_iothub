import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import { Descriptions, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Access, Func, Info } from './component';
const tabKeys = {
  info: 'INFO',
  func: 'FUNC',
  access: 'ACCESS',
};
export default () => {
  const [activeKey, setActiveKey] = useState(tabKeys.info);
  useEffect(() => {
    if (history.location.query && history.location.query.current) {
      const key = history.location.query.current as string;
      setActiveKey(key);
    }
  }, []);
  const handleTabChange = (key: string) => {
    setActiveKey(key);
    history.push({
      query: {
        current: key,
      },
    });
  };
  const PageContent = () => (
    <Descriptions column={2} style={{ marginBottom: -16 }}>
      <Descriptions.Item label="ProductKey">a1Fx1pRJlqU</Descriptions.Item>
      <Descriptions.Item label="设备数">
        <Space>
          <span>1</span>
          <a>前往管理</a>
        </Space>
      </Descriptions.Item>
    </Descriptions>
  );
  const TabContent = () => {
    switch (activeKey) {
      case tabKeys.info:
        return <Info />;
      case tabKeys.func:
        return <Func />;
      case tabKeys.access:
        return <Access />;
      default:
        return null;
    }
  };
  return (
    <PageContainer
      fixedHeader
      header={{
        title: '路灯',
        onBack: () => {
          history.push('/admin/product/');
        },
      }}
      content={<PageContent />}
      tabList={[
        {
          tab: '设备信息',
          key: tabKeys.info,
        },
        {
          tab: '功能模型',
          key: tabKeys.func,
        },
        {
          tab: '权限管理',
          key: tabKeys.access,
        },
      ]}
      tabActiveKey={activeKey}
      onTabChange={handleTabChange}
    >
      <TabContent />
    </PageContainer>
  );
};
