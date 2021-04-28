import request from '@/utils/request';
export async function getDevices(productKey: string): Promise<API.Device[]> {
  return request.get(`/device/getDeviceList?pk=${productKey}`);
}

export async function getDevice(deviceKey: string): Promise<API.Device> {
  return request.get(`/device/getDevice/${deviceKey}`);
}

export async function deleteDevice(deviceKey: string) {
  return request.delete(`/device/delete/${deviceKey}`);
}
export async function createDevice(data: API.CreateDevice) {
  return request.put('/device/create', {
    data,
  });
}
export async function getMessages(deviceKey: string): Promise<API.Message[]> {
  return request.get(`/device/getMessageList/${deviceKey}`);
}

export async function sendCmdRunStatus(
  deviceKey: string,
  status: 'on' | 'off',
) {
  return request.get(`/device/command/run/${deviceKey}/${status}`);
}
