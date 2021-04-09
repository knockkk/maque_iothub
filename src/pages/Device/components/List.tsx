import { Table, Space, Divider } from 'antd';
import { history } from 'umi';
const data: DataType[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: '路灯',
    status: '启用',
    product: '路灯',
  });
}
const dataColumns = [
  {
    title: '设备名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '设备所属产品',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
];
interface DataType {
  key: React.Key;
  name: string;
  status: string;
  product: string;
}
export default () => {
  const handleCheck = (item: any) => {
    console.log('text', item);
    history.push('/device/detail/prodcutkey');
  };
  const handleDelete = (item: any) => {
    console.log('text', item);
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
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
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

  return (
    <>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        pagination={{ defaultPageSize: 5 }}
      />
    </>
  );
};
