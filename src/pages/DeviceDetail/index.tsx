import { history } from 'umi';
import { Descriptions, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Func, Info } from './component';
import PageTab from '@/components/PageTab';
import { getDevice } from '@/apis/device';

export default () => {
  const [backUrl, setBackUrl] = useState('');
  const [device, setDevice] = useState<API.Device>({});
  useEffect(() => {
    requestDevice();
    if (history.location.state) {
      const { backUrl } = history.location.state as { backUrl: string };
      setBackUrl(backUrl);
    }
  }, []);

  const requestDevice = async () => {
    const query = history.location.query;
    const productKey = query && (query.pk as string);
    const deviceName = query && (query.deviceName as string);
    try {
      const device = await getDevice({ productKey, deviceName });
      setDevice(device);
    } catch (err) {
      console.log(err);
    }
  };

  const PageContent = () => (
    <Descriptions column={2} style={{ marginBottom: -16 }}>
      <Descriptions.Item label="ProductKey">
        {device.productKey}
      </Descriptions.Item>
      <Descriptions.Item label="deviceSecret">
        <Space>
          <span>******</span>
          <a>查看</a>
        </Space>
      </Descriptions.Item>
    </Descriptions>
  );

  const tabList = [
    {
      key: 'info',
      tab: '设备信息',
      component: <Info info={device} />,
    },
    {
      key: 'func',
      tab: '功能定义',
      component: <Func />,
    },
  ];
  const onBack = () => {
    history.push(backUrl);
  };
  return (
    <PageTab
      headerTitle={device.deviceName}
      PageContent={PageContent}
      tabList={tabList}
      onBack={onBack}
    />
  );
};
