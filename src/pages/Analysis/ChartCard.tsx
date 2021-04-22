import { Card, Divider } from 'antd';
import React from 'react';
import NumberChart, { IDataItem } from './NumberChart';
interface Props {
  title?: string;
  action?: React.ReactNode;
  number?: number;
  data?: IDataItem[];
  color?: string;
  footer?: React.ReactNode;
}
export default (props: Props) => {
  const { title, action, number, data, color, footer } = props;
  return (
    <Card
      title={title}
      extra={action}
      size="small"
      headStyle={{ fontSize: '16px', color: '#4a4a4a', marginTop: '5px' }}
    >
      <div
        style={{
          fontSize: '28px',
          fontWeight: 500,
          marginBottom: '5px',
          marginLeft: '10px',
        }}
      >
        {number}
      </div>
      <NumberChart data={data} color={color} />
      <Divider style={{ marginBottom: '10px' }} />
      {footer}
    </Card>
  );
};
