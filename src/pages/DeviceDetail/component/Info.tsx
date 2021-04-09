import { Descriptions } from 'antd';
interface Props {
  info: API.Device;
}
export default ({ info }: Props) => {
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
      <Descriptions.Item label="设备状态">{info.connected}</Descriptions.Item>
      <Descriptions.Item label="productKey">
        {info.productKey}
      </Descriptions.Item>
    </Descriptions>
  );
};
