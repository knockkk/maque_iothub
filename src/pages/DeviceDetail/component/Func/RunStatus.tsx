import { Card } from 'antd';
import { history } from 'umi';
import { useEffect, useState } from 'react';
import { getMessages } from '@/apis/device';
import StatusModal, { IStatusModalItem } from './StatusModal';
import { unixToTimeString } from '@/utils/time';
interface Props {
  statusArr: API.FuncDef[];
}

export default ({ statusArr = [] }: Props) => {
  const [messages, setMessages] = useState<API.Message[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<IStatusModalItem[]>([]);
  useEffect(() => {
    requestMessages();
  }, []);
  const handleCheck = (funcKey: string, funcName: string) => {
    const checkedList: IStatusModalItem[] = messages
      .filter((item) => !!item.dataObj[funcKey])
      .map((item) => {
        return {
          funcKey,
          funcName,
          sentAt: unixToTimeString(item.sentAt) as string,
          data: item.dataObj[funcKey],
        };
      });
    console.log(checkedList);
    setModalData(checkedList);
    setModalVisible(true);
  };

  const requestMessages = async () => {
    const query = history.location.query;
    const productKey = (query && (query.pk as string)) || '';
    const deviceName = (query && (query.deviceName as string)) || '';
    try {
      let messages = await getMessages(productKey, deviceName);
      messages = messages.map((item) => {
        let dataObj = {};
        try {
          const dataString = Buffer.from(item.payload as Buffer).toString();
          dataObj = JSON.parse(dataString);
        } catch (err) {
          console.log(err);
        }
        return {
          productName: item.productName,
          deviceName: item.deviceName,
          sentAt: item.sentAt,
          dataObj,
        };
      });
      console.log('messages', messages);
      setMessages(messages);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {statusArr.map((item) => {
        const { funcKey = '', funcName } = item;
        const latestMsg = messages[messages.length - 1] || {};
        const data = latestMsg.dataObj && latestMsg.dataObj[funcKey];
        return (
          <Card
            key={funcKey}
            title={funcName}
            extra={
              <a
                onClick={() => {
                  handleCheck(funcKey, funcName);
                }}
              >
                查看数据
              </a>
            }
            style={{ width: 300, margin: '0 20px 20px 0' }}
            size="small"
          >
            <p style={{ fontSize: '20px' }}>
              {data || '--'}
              {item.unit}
              {data && (
                <span
                  style={{
                    color: '#8d8d8d',
                    fontSize: '11px',
                    marginLeft: '20px',
                  }}
                >
                  发送于 {latestMsg.sentAt}
                </span>
              )}
            </p>
            <p style={{ color: '#6a6a6a' }}>{item.description}</p>
          </Card>
        );
      })}
      <StatusModal
        dataList={modalData}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
      />
    </div>
  );
};
