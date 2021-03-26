import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default (props: { text: string }) => (
  <Tooltip title={props.text}>
    <QuestionCircleOutlined style={{ color: '#8d8d8d', fontSize: '12px' }} />
  </Tooltip>
);
