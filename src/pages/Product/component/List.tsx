import { Table, Space, Divider } from 'antd';
import { history } from 'umi';
const data: any = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: '路灯',
    createTime: '2021/02/05 09:10:27',
    productKey: 'a1Fx1pRJlqU',
  });
}
const dataColumns = [
  {
    title: '产品名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'ProductKey',
    dataIndex: 'productKey',
    key: 'productKey',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
];

export default () => {
  const handleCheck = (item: any) => {
    console.log('text', item);
    history.push('/admin/product/detail/prodcutkey');
  };
  const handleDevice = (item: any) => {
    console.log('text', item);
  };
  const handleDelete = (item: any) => {
    console.log('text', item);
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
              handleDevice(item);
            }}
          >
            管理设备
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
        columns={columns}
        dataSource={data}
        pagination={{ defaultPageSize: 7 }}
      />
    </>
  );
};
