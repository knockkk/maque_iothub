import { Table, Space, Divider, Switch, message } from 'antd';
import { history } from 'umi';
import { unixToTimeString } from '@/utils/time';
import DeviceStatus from '@/components/DeviceStatus';
interface Props {
  list: API.Device[];
  onDelete: (key: string) => void;
  onSendCmd?: (status: 'on' | 'off', deviceKey: string) => void;
  loading?: boolean;
}
export default (props: Props) => {
  const handleCheck = (item: API.Device) => {
    const { pathname, search } = history.location;
    const backUrl = pathname + '?' + search;
    history.push(
      `/device/detail?pk=${item.productKey}&deviceKey=${item.deviceKey}`,
      {
        backUrl,
      },
    );
  };
  const handleDelete = (deviceKey: string) => {
    props.onDelete && props.onDelete(deviceKey);
  };

  const onRunStatusChange = async (checked: boolean, deviceKey: string) => {
    const status = checked ? 'off' : 'on';
    props.onSendCmd && props.onSendCmd(status, deviceKey);
  };
  const columns = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '状态',
      dataIndex: 'connected',
      key: 'connected',
      render: (status: string, item: API.Device) => {
        return (
          <Space>
            <DeviceStatus status={status} />
            {status !== '未激活' && (
              <Switch
                checkedChildren="开机"
                unCheckedChildren="关机"
                checked={status === '离线'}
                onChange={(checked) =>
                  onRunStatusChange(checked, item.deviceKey || '')
                }
              />
            )}
          </Space>
        );
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
      render: (item: API.Device) => (
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
              item.deviceKey && handleDelete(item.deviceKey);
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
