import { Space } from 'antd';
import React from 'react';
import styles from './index.less';
import Avatar from './AvatarDropdwon';

const GlobalHeaderRight: React.FC = () => {
  let className = styles.right;
  return (
    <Space className={className}>
      <Avatar />
    </Space>
  );
};
export default GlobalHeaderRight;
