import { Table, Space, Divider } from 'antd';
import { history } from 'umi';
import { unixToTimeString } from '@/utils/time';
import DeviceStatus from '@/components/DeviceStatus';
interface Props {
  list: API.Device[];
  onDelete: (item: API.Device) => void;
  loading?: boolean;
}
export default (props: Props) => {
  const handleCheck = (item: API.Device) => {
    const { pathname, search } = history.location;
    const backUrl = pathname + search;
    history.push(
      `/device/detail?pk=${item.productKey}&deviceName=${item.deviceName}`,
      {
        backUrl,
      },
    );
  };
  const handleDelete = (item: API.Device) => {
    props.onDelete && props.onDelete(item);
  };

  const columns = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: 'productKey',
      dataIndex: 'productKey',
      key: 'productKey',
    },
    {
      title: '状态',
      dataIndex: 'connected',
      key: 'connected',
      render: (status: string) => {
        return <DeviceStatus status={status} />;
      },
    },
    {
      title: '最后上线时间',
      dataIndex: 'lastOnlineTime',
      key: 'lastOnlineTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (item: any) => (
        <Space size="small">
          <a
            onClick={() => {
              handleCheck(item);
            }}
          >
            查看
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleDelete(item);
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];
  const dataSource = props.list.map((item, index) => {
    return {
      key: index,
      ...item,
      lastOnlineTime: unixToTimeString(item.lastOnlineTime),
    };
  });
  return (
    <>
      <Table
        loading={props.loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{ defaultPageSize: 5 }}
      />
    </>
  );
};
