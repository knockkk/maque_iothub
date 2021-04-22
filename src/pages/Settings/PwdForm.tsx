import { Form, Input, Button } from 'antd';

export default () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item label="旧密码" name="old">
        <Input.Password />
      </Form.Item>
      <Form.Item label="新密码" name="new">
        <Input.Password />
      </Form.Item>
      <Form.Item label="确认密码" name="confirm">
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" danger htmlType="submit">
          修改密码
        </Button>
      </Form.Item>
    </Form>
  );
};
