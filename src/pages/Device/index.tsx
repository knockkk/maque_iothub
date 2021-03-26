import { PageContainer } from '@ant-design/pro-layout';
import { ProFormSelect } from '@ant-design/pro-form';
import { Row, Col, Statistic, Input, Tooltip, Space, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import styles from './index.less';
import List from './components/List';

const { Search } = Input;
export default () => {
  const PageContent = () => {
    return (
      <div>
        <Row gutter={48} wrap={false}>
          <Col span={4}>
            <ProFormSelect
              label=""
              showSearch
              request={async ({ keyWords }) => {
                console.log('keywords', keyWords);
                return [
                  {
                    value: keyWords,
                    label: '目标_target',
                  },
                  {
                    value: keyWords,
                    label: '路灯',
                  },
                ];
              }}
              placeholder="选择产品"
            />
          </Col>
          <Col span={4} offset={1}>
            <Statistic title="设备总数" value={1} />
          </Col>
          <Col span={4}>
            <Statistic title="激活设备" value={0} />
          </Col>
          <Col span={4}>
            <Statistic title="当前在线" value={0} />
          </Col>
          <Col span={4}>
            <Tooltip title="刷新">
              <ReloadOutlined className={styles.reload} />
            </Tooltip>
          </Col>
        </Row>
      </div>
    );
  };
  return (
    <PageContainer
      fixedHeader
      header={{
        title: '设备',
      }}
      content={<PageContent />}
    >
      <Space size="middle" style={{ marginBottom: '10px' }}>
        <Button type="primary">添加设备</Button>
        <Search onSearch={() => {}} allowClear placeholder="输入设备名称查询" />
      </Space>
      <List />
    </PageContainer>
  );
};
