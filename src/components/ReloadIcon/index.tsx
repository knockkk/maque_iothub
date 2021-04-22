import { Tooltip } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import styles from './index.less';
import React from 'react';
interface Props {
  onClick?: () => void;
  style?: React.CSSProperties;
}
export default (props: Props) => {
  return (
    <Tooltip title="刷新">
      <ReloadOutlined
        onClick={() => {
          props.onClick && props.onClick();
        }}
        className={styles.reload}
        style={props.style}
      />
    </Tooltip>
  );
};
