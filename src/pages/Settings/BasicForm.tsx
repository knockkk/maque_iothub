import { Form, Input, Button } from 'antd';

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <Form
      initialValues={{
        id: 'admin',
        username: '李明天',
        email: '1628282322@qq.com',
        telephone: '17628763121',
      }}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item label="用户ID" name="id">
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="真实姓名"
        name="username"
        rules={[{ required: true, message: '姓名不能未空' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="邮箱" name="email">
        <Input />
      </Form.Item>

      <Form.Item label="联系电话" name="telephone">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          更新信息
        </Button>
      </Form.Item>
    </Form>
  );
};
