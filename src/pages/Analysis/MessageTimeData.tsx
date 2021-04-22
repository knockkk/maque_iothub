import MessageChart from './MessageChart';

const msgTimeData = [
  {
    x: '16时37分',
    y: 16,
  },
  {
    x: '16时38分',
    y: 14,
  },
  {
    x: '16时39分',
    y: 16,
  },
  {
    x: '16时40分',
    y: 14,
  },
  {
    x: '16时41分',
    y: 16,
  },
  {
    x: '16时42分',
    y: 14,
  },
  {
    x: '16时43分',
    y: 16,
  },
];
for (let i = 1; i <= 60; i++) {
  msgTimeData.push({
    x: '17时' + i + '分',
    y: i % 2 === 0 ? 18 : 14,
  });
}
for (let i = 1; i <= 60; i++) {
  msgTimeData.push({
    x: '18时' + i + '分',
    y: i % 2 === 0 ? 88 : 80,
  });
}
export default () => {
  return (
    <div
      style={{
        width: '100%',
        background: '#fff',
        padding: '30px',
        marginTop: '20px',
      }}
    >
      <div
        style={{
          fontSize: '19px',
          color: '#1890ff',
          fontWeight: 500,
          marginBottom: '20px',
        }}
      >
        设备消息
      </div>
      <MessageChart data={msgTimeData} />
    </div>
  );
};
