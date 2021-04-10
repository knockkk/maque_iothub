import { Tag, Badge } from 'antd';
export default ({ status }: { status: string }) => {
  switch (status) {
    case '在线':
      return (
        <Tag color="blue">
          <Badge status="processing" />
          {status}
        </Tag>
      );
    case '离线':
      return <Tag color="geekblue">{status}</Tag>;
    case '未激活':
      return <Tag color="red">{status}</Tag>;
    default:
      return <div></div>;
  }
};
