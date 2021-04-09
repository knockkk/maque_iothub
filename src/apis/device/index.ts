import request from '@/utils/request';
export async function getDevices(productKey: string): Promise<API.Device[]> {
  return request.get(`/device/getDevices?pk=${productKey}`);
}

export async function getDevice(data: API.Device): Promise<API.Device> {
  return request.post(`/device`, {
    data: {
      productKey: data.productKey,
      deviceName: data.deviceName,
    },
  });
}

export async function deleteDevice(data: API.Device) {
  return request.delete(`/device`, {
    data: {
      productKey: data.productKey,
      deviceName: data.deviceName,
    },
  });
}
export async function createDevice(data: API.CreateDevice) {
  return request.put('/device', {
    data,
  });
}
