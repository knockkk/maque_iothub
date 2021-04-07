import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Modal } from 'antd';
interface Props {
  title?: string;
  initialValues?: API.CreateProduct;
  onSubmit?: (value: API.CreateProduct) => void;
  visible?: boolean;
  onCancel?: () => void;
}
export default (props: Props) => {
  const handleFinish = async (value: API.CreateProduct) => {
    if (value.productName) {
      props.onSubmit && props.onSubmit(value);
    }
  };
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      footer={[]}
    >
      <ProForm<{
        productName: string;
        description: string;
      }>
        onFinish={handleFinish}
        initialValues={props.initialValues}
      >
        <ProForm.Group>
          <ProFormText width="md" name="productName" label="产品名称" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormTextArea width="md" name="description" label="产品描述" />
        </ProForm.Group>
      </ProForm>
    </Modal>
  );
};
