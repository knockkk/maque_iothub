import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col, Statistic, Input, Space, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import List from './components/List';
import SearchSelectProduct from './components/SearchSelectProduct';
import { getDevices, createDevice, deleteDevice } from '@/apis/device';
import DeviceFormModal from './components/DeviceFormModal';
import ReloadIcon from '@/components/ReloadIcon';

const { Search } = Input;
const getProductKeyFromUrl = (query: any) => {
  if (query) {
    return query.pk || '';
  }
  return '';
};
export default () => {
  const [deviceList, setDeviceList] = useState<API.Device[]>([]);
  const [currPK, setCurrPK] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    const pk = getProductKeyFromUrl(history.location.query);
    updatePKandDeviceList(pk);
  }, []);

  const updatePKandDeviceList = (pk: string) => {
    setCurrPK(pk);
    history.push(`/device/?pk=${pk}`);
    updateDeviceList(pk);
  };

  const updateDeviceList = async (productKey: string) => {
    setLoading(true);
    try {
      let list: API.Device[] = await getDevices(productKey);
      list = list.map((item) => {
        let status = '';
        if (item.connected === null) {
          status = '未激活';
        } else {
          status = item.connected ? '在线' : '离线';
        }
        return {
          deviceName: item.deviceName,
          productKey: item.productKey,
          connected: status,
          lastOnlineTime: item.lastOnlineTime ? item.lastOnlineTime : '无',
        };
      });
      setLoading(false);
      setDeviceList(list);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const handlePKChange = (pk: string) => {
    updatePKandDeviceList(pk);
  };
  const createSubmit = async (value: API.CreateDevice) => {
    setIsModalVisible(false);
    try {
      const response = await createDevice(value);
      if (response.error) {
        message.error(response.error);
      } else {
        message.success('添加成功');
        updateDeviceList(currPK);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const hanleDeviceDelete = async (item: API.Device) => {
    try {
      const resp = await deleteDevice(item);
      if (resp.status === 200) {
        message.success('删除成功');
        updateDeviceList(currPK);
      } else {
        message.error('删除失败' + JSON.stringify(resp));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const activeNum = deviceList.filter((item) => item.connected !== '未激活')
    .length;
  const onlineNum = deviceList.filter((item) => item.connected === '在线')
    .length;
  return (
    <PageContainer
      fixedHeader
      header={{
        title: '设备',
        breadcrumb: {
          routes: [
            {
              path: '',
              breadcrumbName: '首页',
            },
            {
              path: '',
              breadcrumbName: '设备管理',
            },
            {
              path: '',
              breadcrumbName: '设备',
            },
          ],
        },
      }}
      content={
        <Row gutter={48} wrap={false}>
          <Col span={4}>
            <SearchSelectProduct currPK={currPK} onChange={handlePKChange} />
          </Col>
          <Col span={4} offset={1}>
            <Statistic title="设备总数" value={deviceList.length} />
          </Col>
          <Col span={4}>
            <Statistic title="激活设备" value={activeNum} />
          </Col>
          <Col span={4}>
            <Statistic title="当前在线" value={onlineNum} />
          </Col>
          <Col span={4}>
            <ReloadIcon onClick={() => updateDeviceList(currPK)} />
          </Col>
        </Row>
      }
    >
      <Space size="middle" style={{ marginBottom: '10px' }}>
        <Button
          type="primary"
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          添加设备
        </Button>
        <Search onSearch={() => {}} allowClear placeholder="输入设备名称查询" />
      </Space>
      <List list={deviceList} loading={loading} onDelete={hanleDeviceDelete} />

      <DeviceFormModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        initialValues={{
          productKey: currPK,
          deviceName: '',
        }}
        onSubmit={createSubmit}
      />
    </PageContainer>
  );
};
