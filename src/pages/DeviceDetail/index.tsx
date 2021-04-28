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
    const deviceKey = query && (query.deviceKey as string);
    if (deviceKey) {
      try {
        const device = await getDevice(deviceKey);
        setDevice(device);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const PageContent = () => (
    <Descriptions column={2} style={{ marginBottom: -16 }}>
      <Descriptions.Item label="产品">{device.productName}</Descriptions.Item>
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
          <Descriptions.Item label="DeviceKey" span={3}>
            {device.deviceKey}
          </Descriptions.Item>
          <Descriptions.Item label="DeviceSecret" span={3}>
            {device.deviceSecret}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};
