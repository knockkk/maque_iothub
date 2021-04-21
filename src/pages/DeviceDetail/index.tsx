import { history } from 'umi';
import { Descriptions, Space, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { Func, Info } from './component';
import PageTab from '@/components/PageTab';
import { getDevice } from '@/apis/device';

export default () => {
  const [backUrl, setBackUrl] = useState('');
  const [device, setDevice] = useState<API.Device>({});
  const [modalVisible, setModalVisible] = useState(false);
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
          <a onClick={() => setModalVisible(true)}>查看</a>
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
      tab: '设备数据',
      component: <Func />,
    },
  ];
  const onBack = () => {
    history.push(backUrl);
  };
  return (
    <>
      <PageTab
        headerTitle={device.deviceName}
        PageContent={PageContent}
        tabList={tabList}
        onBack={onBack}
      />
      <Modal
        title="设备证书"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[]}
      >
        <Descriptions bordered>
          <Descriptions.Item label="ProductKey" span={3}>
            {device.productKey}
          </Descriptions.Item>
          <Descriptions.Item label="DeviceName" span={3}>
            {device.deviceName}
          </Descriptions.Item>
          <Descriptions.Item label="DeviceSecret" span={3}>
            {device.deviceSecret}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};
