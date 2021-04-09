import request from '@/utils/request';
export async function getDevices(productKey: string): Promise<API.Device[]> {
  return request.get(`/device/getDevices?pk=${productKey}`);
}
