import { message } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';

export default () => {
  const handleFinish = async (data: {
    productName: string;
    description: string;
  }) => {
    console.log(data);
    message.success('提交成功');
  };
  return (
    <ProForm<{
      productName: string;
      description: string;
    }>
      onFinish={handleFinish}
    >
      <ProForm.Group>
        <ProFormText width="md" name="productName" label="产品名称" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="description" label="产品描述" />
      </ProForm.Group>
    </ProForm>
  );
};
