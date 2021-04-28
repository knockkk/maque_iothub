import { Card, Alert, Button } from 'antd';
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
    setModalData(checkedList);
    setModalVisible(true);
  };

  const requestMessages = async () => {
    const query = history.location.query;
    const deviceKey = (query && (query.deviceKey as string)) || '';
    try {
      let messages = await getMessages(deviceKey);
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

  const gotoProductFuncPage = () => {
    const { pathname, search, query } = history.location;
    const productKey = (query && (query.pk as string)) || '';
    const url = `/product/detail/${productKey}?current=func`;
    const backUrl = pathname + '?' + search;
    history.push(url, {
      backUrl,
    });
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
                  发送于 {unixToTimeString(latestMsg.sentAt)}
                </span>
              )}
            </p>
            <p style={{ color: '#6a6a6a' }}>{item.description}</p>
          </Card>
        );
      })}
      {statusArr.length === 0 && (
        <Alert
          message="未定义运行状态，请前往'功能定义'页面进行管理"
          type="info"
          showIcon
          action={
            <Button onClick={gotoProductFuncPage} size="small" type="primary">
              前往管理
            </Button>
          }
        />
      )}
      <StatusModal
        dataList={modalData}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
      />
    </div>
  );
};
