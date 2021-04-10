export function unixToTimeString(unix: number | string | undefined) {
  if (!unix || typeof unix !== 'number') return unix;
  const time = new Date(unix);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  return (
    year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
  );
}
