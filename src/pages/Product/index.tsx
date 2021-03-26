import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import { Modal, Space, Input, Button } from 'antd';
import List from './component/List';
import CreateForm from './component/CreateForm';
import Tip from '@/components/Tip';

const { Search } = Input;
export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCreate = () => {
    setIsModalVisible(true);
  };
  const onSearch = (value: string) => {
    console.log('search=>>', value);
  };
  const HeaderTitle = () => (
    <div>
      产品（设备模型）
      <Tip text="产品是一系列相同设备的集合"></Tip>
    </div>
  );
  return (
    <PageContainer
      fixedHeader
      header={{
        title: <HeaderTitle />,
      }}
    >
      <Space size="middle" style={{ marginBottom: '10px' }}>
        <Button type="primary" onClick={handleCreate}>
          创建产品
        </Button>
        <Search onSearch={onSearch} allowClear placeholder="输入产品名称查询" />
      </Space>
      <List />
      <Modal
        title="产品创建"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={[]}
      >
        <CreateForm />
      </Modal>
    </PageContainer>
  );
};
