import { Descriptions, Badge } from 'antd';
export default () => {
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
      <Descriptions.Item label="产品名称">路灯</Descriptions.Item>
      <Descriptions.Item label="创建时间">
        2021/02/05 09:10:27
      </Descriptions.Item>
      <Descriptions.Item label="产品描述">-</Descriptions.Item>
      <Descriptions.Item label="Order time">
        2018-04-24 18:00:00
      </Descriptions.Item>
      <Descriptions.Item label="Usage Time" span={2}>
        2019-04-24 18:00:00
      </Descriptions.Item>
      <Descriptions.Item label="Status" span={3}>
        <Badge status="processing" text="Running" />
      </Descriptions.Item>
      <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
      <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
      <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
      <Descriptions.Item label="Config Info">
        Region: East China 1
      </Descriptions.Item>
    </Descriptions>
  );
};
