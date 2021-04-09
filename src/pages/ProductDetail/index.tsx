import { history } from 'umi';
import { Descriptions, Space, message } from 'antd';
import { useEffect, useState } from 'react';
import { Func, Info } from './component';
import { getProduct, updateProduct } from '@/apis/user';
import PageTab from '@/components/PageTab';

const getProductKeyFromUrl = (pathname: string) => {
  const arr = pathname.split('/');
  return arr[arr.length - 1] || '';
};
export default () => {
  const [product, setProduct] = useState<API.Product>({});
  const [backUrl, setBackUrl] = useState('');
  useEffect(() => {
    requestProduct();
    if (history.location.state) {
      const { backUrl } = history.location.state as { backUrl: string };
      setBackUrl(backUrl);
    }
  }, []);

  const requestProduct = async () => {
    const productKey = getProductKeyFromUrl(history.location.pathname);
    try {
      const product = await getProduct(productKey);
      setProduct(product);
    } catch (err) {
      console.log(err);
    }
  };

  const PageContent = () => (
    <Descriptions column={2} style={{ marginBottom: -16 }}>
      <Descriptions.Item label="ProductKey">
        {product.productKey}
      </Descriptions.Item>
      <Descriptions.Item label="设备数">
        <Space>
          <span>1</span>
          <a>前往管理</a>
        </Space>
      </Descriptions.Item>
    </Descriptions>
  );

  const updateProductInfo = async (info: API.CreateProduct) => {
    try {
      await updateProduct({ productKey: product.productKey || '', ...info });
      message.success('更新成功');
      requestProduct();
    } catch (err) {
      console.log(err);
    }
  };
  const tabList = [
    {
      key: 'info',
      tab: '产品信息',
      component: <Info info={product} onSubmit={updateProductInfo} />,
    },
    {
      key: 'func',
      tab: '功能定义',
      component: <Func />,
    },
  ];

  const onBack = () => {
    history.push(backUrl);
  };
  return (
    <PageTab
      headerTitle={product.productName}
      PageContent={PageContent}
      tabList={tabList}
      onBack={onBack}
    />
  );
};
