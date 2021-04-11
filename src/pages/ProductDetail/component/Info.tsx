import { Descriptions } from 'antd';
import { useState } from 'react';
import { Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ProductFormModal from '@/components/ProductFormModal';
import { unixToTimeString } from '@/utils/time';
import styles from '../index.less';
interface Props {
  info: API.Product;
  onSubmit?: (info: API.CreateProduct) => void;
}

export default ({ info, onSubmit = () => {} }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const editClick = () => {
    setIsModalVisible(true);
  };
  const handleSubmit = (item: API.CreateProduct) => {
    setIsModalVisible(false);
    onSubmit(item);
  };
  const Title = () => (
    <Space>
      <div>产品信息</div>
      <EditOutlined onClick={editClick} className={styles.optionIcon} />
      <div onClick={editClick} className={styles.optionText}>
        编辑
      </div>
    </Space>
  );
  return (
    <>
      <Descriptions
        title={<Title />}
        bordered
        contentStyle={{
          background: '#fefefe',
        }}
        labelStyle={{
          background: '#fafafa',
        }}
      >
        <Descriptions.Item label="产品名称">
          {info.productName}
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">
          {unixToTimeString(info.createAt)}
        </Descriptions.Item>
        <Descriptions.Item label="产品描述">
          {info.description}
        </Descriptions.Item>
      </Descriptions>

      <ProductFormModal
        title="编辑产品信息"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        initialValues={{
          productName: info.productName || '',
          description: info.description || '',
        }}
        onSubmit={handleSubmit}
      />
    </>
  );
};
