import { Descriptions } from 'antd';
import DeviceStatus from '@/components/DeviceStatus';
interface Props {
  info: API.Device;
}
export default ({ info }: Props) => {
  let status = '';
  if (info.connected === null) {
    status = '未激活';
  } else {
    status = info.connected ? '在线' : '离线';
  }
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
      <Descriptions.Item label="productKey">
        {info.productKey}
      </Descriptions.Item>
    </Descriptions>
  );
};
