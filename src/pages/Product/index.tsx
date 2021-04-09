import { PageContainer } from '@ant-design/pro-layout';
import { useEffect, useState } from 'react';
import { Space, Input, Button, message } from 'antd';
import List from './component/List';
import Tip from '@/components/Tip';
import { getProducts, createProduct, deleteProduct } from '@/apis/user';
import ProductFormModal from '@/components/ProductFormModal';
const { Search } = Input;
export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productList, setProdcutList] = useState<API.Product[]>([]);
  useEffect(() => {
    updateList();
  }, []);

  const updateList = async (): Promise<API.Product[]> => {
    try {
      const list: API.Product[] = await getProducts();
      setProdcutList(list);
    } catch (err) {
      setProdcutList([]);
      console.log(err);
    }
    return [];
  };

  const createSubmit = async (value: API.CreateProduct) => {
    setIsModalVisible(false);
    try {
      await createProduct(value);
      message.success('创建成功');
      updateList();
    } catch (err) {
      console.log(err);
    }
  };
  const onSearch = (value: string) => {
    console.log('search=>>', value);
  };
  const onDelete = async (item: API.Product) => {
    try {
      await deleteProduct(item.productKey as string);
      message.success('删除成功');
      updateList();
    } catch (err) {
      console.log(err);
    }
  };
  const HeaderTitle = () => (
    <div>
      产品（设备模型）
      <Tip text="产品是一类相同设备的集合"></Tip>
    </div>
  );
  return (
    <PageContainer
      fixedHeader
      header={{
        title: <HeaderTitle />,
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
              breadcrumbName: '产品',
            },
          ],
        },
      }}
    >
      <Space size="middle" style={{ marginBottom: '10px' }}>
        <Button
          type="primary"
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          创建产品
        </Button>
        <Search onSearch={onSearch} allowClear placeholder="输入产品名称查询" />
      </Space>

      <List list={productList} onDelete={onDelete} />
      <ProductFormModal
        title="产品创建"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        initialValues={{
          productName: '',
          description: '',
        }}
        onSubmit={createSubmit}
      />
    </PageContainer>
  );
};
