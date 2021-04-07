import { Table, Space, Divider } from 'antd';
import { history } from 'umi';

const dataColumns = [
  {
    title: '产品名称',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'ProductKey',
    dataIndex: 'productKey',
    key: 'productKey',
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
    key: 'createAt',
  },
];
interface Props {
  list: API.Product[];
  onDelete: (item: API.Product) => void;
}
export default (props: Props) => {
  const handleCheck = (item: API.Product) => {
    const { pathname, search } = history.location;
    const backUrl = pathname + '?' + search;
    history.push(`/admin/product/detail/${item.productKey}`, {
      backUrl,
    });
  };
  const handleDevice = (item: any) => {
    console.log('text', item);
  };
  const handleDelete = (item: any) => {
    props.onDelete && props.onDelete(item);
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
  const dataSource = props.list.map((item, index) => {
    return {
      key: index,
      ...item,
    };
  });
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ defaultPageSize: 7 }}
      />
    </>
  );
};
