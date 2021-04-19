import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import styles from './index.less';
const Tip = () => (
  <div
    style={{
      marginBottom: 24,
    }}
  >
    <ProFormCheckbox noStyle name="autoLogin">
      自动登录
    </ProFormCheckbox>
    <a
      style={{
        float: 'right',
      }}
    >
      忘记密码 ?
    </a>
  </div>
);
type FormProps = {
  onSubmit?: (values: API.LoginParams) => void;
};
const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const handleSubmit = async (values: API.LoginParams) => {
    onSubmit && onSubmit(values);
  };

  return (
    <ProForm
      submitter={{
        searchConfig: {
          submitText: '登录',
        },
        render: (_, dom) => dom.pop(),
        submitButtonProps: {
          size: 'large',
          style: {
            width: '100%',
          },
        },
      }}
      onFinish={async (values: API.LoginParams) => {
        handleSubmit(values);
      }}
      initialValues={{
        username: 'admin',
        password: 'maqueiot',
      }}
    >
      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className={styles.prefixIcon} />,
        }}
        placeholder="请输入用户名"
        rules={[
          {
            required: true,
            message: '用户名是必填项！',
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={styles.prefixIcon} />,
        }}
        placeholder="请输入密码"
        rules={[
          {
            required: true,
            message: '密码是必填项！',
          },
        ]}
      />
      <Tip />
    </ProForm>
  );
};

export default Form;
