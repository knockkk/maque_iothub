import { Table, Space, Divider } from 'antd';
import { history } from 'umi';

const dataColumns = [
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
  },
  {
    title: '最后上线时间',
    dataIndex: 'lastOnlineTime',
    key: 'lastOnlineTime',
  },
];
interface DataType {
  key: React.Key;
  deviceName: string;
  productKey: string;
  connected: string;
  lastOnlineTime: string;
}
interface Props {
  list: API.Device[];
  onDelete: (item: API.Device) => void;
  loading?: boolean;
}
export default (props: Props) => {
  const handleCheck = (item: API.Product) => {
    const { pathname, search } = history.location;
    const backUrl = pathname + '?' + search;
    history.push(`/device/detail/${item.productKey}`, {
      backUrl,
    });
  };
  const handleDelete = (item: API.Product) => {
    props.onDelete && props.onDelete(item);
  };
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
    getCheckboxProps: (record: DataType) => {
      console.log('record=>>', record);
    },
  };
  const columns = [
    ...dataColumns,
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
    };
  });
  return (
    <>
      <Table
        // rowSelection={{
        //   type: 'checkbox',
        //   ...rowSelection,
        // }}
        loading={props.loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{ defaultPageSize: 5 }}
      />
    </>
  );
};
