import { Descriptions } from 'antd';
import DeviceStatus from '@/components/DeviceStatus';
interface Props {
  info: API.Device;
}
export default ({ info }: Props) => {
  const connnected = info.connction ? info.connction.connected : null;
  let status = '';
  if (connnected === null) {
    status = '未激活';
  } else {
    status = connnected ? '在线' : '离线';
  }
  console.log('info', info);
  return (
    <Descriptions
      title="设备信息"
      bordered
      contentStyle={{
        background: '#fefefe',
      }}
      labelStyle={{
        background: '#fafafa',
      }}
    >
      <Descriptions.Item label="设备名称">{info.deviceName}</Descriptions.Item>
      <Descriptions.Item label="设备状态">
        <DeviceStatus status={status} />
      </Descriptions.Item>
      <Descriptions.Item label="deviceKey">{info.deviceKey}</Descriptions.Item>
      <Descriptions.Item label="所属产品">{info.productName}</Descriptions.Item>
      <Descriptions.Item label="描述">{info.description}</Descriptions.Item>
    </Descriptions>
  );
};
