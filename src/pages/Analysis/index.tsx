import ChartCard from './ChartCard';
import { Row, Col } from 'antd';
import ReloadIcon from '@/components/ReloadIcon';
import MessageTimeData from './MessageTimeData';
import { history } from 'umi';
export default () => {
  const onlineDeviceData = [
    {
      x: '2021-1-12',
      y: 12,
    },
    {
      x: '2021-1-13',
      y: 12,
    },
    {
      x: '2021-1-14',
      y: 12,
    },
    {
      x: '2021-1-15',
      y: 11,
    },
    {
      x: '2021-1-16',
      y: 11,
    },
    {
      x: '2021-1-17',
      y: 12,
    },
    {
      x: '2021-1-18',
      y: 13,
    },
    {
      x: '2021-1-19',
      y: 12,
    },
    {
      x: '2021-1-20',
      y: 12,
    },
  ];
  const deviceMsgData = [
    {
      x: '2021-1-12',
      y: 10001,
    },
    {
      x: '2021-1-13',
      y: 8000,
    },
    {
      x: '2021-1-14',
      y: 8000,
    },
    {
      x: '2021-1-15',
      y: 8000,
    },
    {
      x: '2021-1-16',
      y: 10021,
    },
    {
      x: '2021-1-17',
      y: 10021,
    },
    {
      x: '2021-1-18',
      y: 6000,
    },
    {
      x: '2021-1-19',
      y: 5000,
    },
    {
      x: '2021-1-20',
      y: 5000,
    },
    {
      x: '2021-1-21',
      y: 6000,
    },
    {
      x: '2021-1-22',
      y: 10021,
    },
    {
      x: '2021-1-23',
      y: 10021,
    },
  ];
  const alarmData = [
    {
      x: '2021-1-12',
      y: 10,
    },
    {
      x: '2021-1-13',
      y: 9,
    },
    {
      x: '2021-1-14',
      y: 5,
    },
    {
      x: '2021-1-15',
      y: 6,
    },
    {
      x: '2021-1-16',
      y: 10,
    },
    {
      x: '2021-1-17',
      y: 2,
    },
    {
      x: '2021-1-18',
      y: 10,
    },
    {
      x: '2021-1-19',
      y: 6,
    },
    {
      x: '2021-1-20',
      y: 10,
    },
  ];
  return (
    <>
      <Row>
        <Col span={6} style={{ marginRight: '20px' }}>
          <ChartCard
            title="设备在线数量"
            action={
              <a
                onClick={() => {
                  history.push(`/device`);
                }}
              >
                查看
              </a>
            }
            number={0}
            data={onlineDeviceData}
            color="#1890ff"
            footer="设备总数 10,148"
          ></ChartCard>
        </Col>
        <Col span={6} style={{ marginRight: '20px' }}>
          <ChartCard
            title="今日设备消息量"
            data={deviceMsgData}
            number={10021}
            color="#7868e6"
            footer="当月设备消息量 65,673,049"
          ></ChartCard>
        </Col>
        <Col span={6} style={{ marginRight: '20px' }}>
          <ChartCard
            title="今日警报数量"
            number={5}
            data={alarmData}
            action={<a href="#">查看</a>}
            footer="当月报警总数量 219"
          ></ChartCard>
        </Col>
        <Col span={3}>
          <ReloadIcon style={{ fontSize: '22px', margin: '20px' }} />
        </Col>
      </Row>
      <Row>
        <MessageTimeData />
      </Row>
    </>
  );
};
