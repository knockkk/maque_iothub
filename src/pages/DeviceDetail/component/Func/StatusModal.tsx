import { useState } from 'react';
import { Modal, Table, Tabs } from 'antd';
import Chart from './Chart';
const { TabPane } = Tabs;
export interface IStatusModalItem {
  funcKey?: string;
  funcName?: string;
  sentAt?: string;
  data?: string;
}
const columns = [
  {
    title: '属性名',
    dataIndex: 'funcName',
    key: 'funcName',
  },
  {
    title: '标识符',
    dataIndex: 'funcKey',
    key: 'funcKey',
  },
  {
    title: '数据',
    dataIndex: 'data',
    key: 'data',
  },
  {
    title: '发送时间',
    dataIndex: 'sentAt',
    key: 'sentAt',
  },
];
interface Props {
  visible?: boolean;
  onCancel?: () => void;
  dataList?: IStatusModalItem[];
}
export default ({ dataList, visible, onCancel }: Props) => {
  const [tabKey, setTabKey] = useState('chart');
  const dataSource = Array.isArray(dataList)
    ? dataList.map((item, index) => {
        return {
          key: index,
          ...item,
        };
      })
    : [];
  const chartList = Array.isArray(dataList)
    ? dataList.map((item) => {
        return {
          date: item.sentAt || '',
          value: item.data || '',
        };
      })
    : [];
  return (
    <Modal
      title={'查看数据'}
      visible={visible}
      onCancel={onCancel}
      footer={[]}
      width="60%"
    >
      <Tabs
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)}
        size="small"
        type="card"
      >
        <TabPane tab="图表" key="chart">
          {chartList.length > 0 ? (
            <Chart list={chartList} />
          ) : (
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              暂无数据
            </div>
          )}
        </TabPane>
        <TabPane tab="表格" key="table">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ defaultPageSize: 5 }}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
};
