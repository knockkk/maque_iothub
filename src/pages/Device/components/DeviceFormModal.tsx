import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { getProducts } from '@/apis/user';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
interface Props {
  initialValues?: API.CreateDevice;
  onSubmit?: (value: API.CreateDevice) => void;
  visible?: boolean;
  onCancel?: () => void;
}
export default (props: Props) => {
  const [productList, setProductList] = useState<API.Product[]>([]);
  useEffect(() => {
    getProductList();
  }, []);
  const getProductList = async () => {
    try {
      const list: API.Product[] = await getProducts();
      setProductList(list);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFinish = async (value: API.CreateDevice) => {
    props.onSubmit && props.onSubmit(value);
  };

  const pOptionValueEnum = Array.isArray(productList)
    ? productList.reduce((prev, curr) => {
        const productKey = curr.productKey as string;
        prev[productKey] = curr.productName;
        return prev;
      }, {})
    : [];
  return (
    <Modal
      title="添加设备"
      visible={props.visible}
      onCancel={props.onCancel}
      footer={[]}
    >
      <ProForm<{
        productKey: string;
        deviceName: string;
      }>
        onFinish={handleFinish}
        initialValues={props.initialValues}
      >
        <ProForm.Group>
          <ProFormSelect
            name="productKey"
            label="产品"
            valueEnum={pOptionValueEnum}
            placeholder="请选择产品"
            rules={[{ required: true, message: '请选择产品' }]}
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText width="md" name="deviceName" label="设备名称" />
        </ProForm.Group>
        <ProFormTextArea width="md" name="description" label="描述" />
      </ProForm>
    </Modal>
  );
};
