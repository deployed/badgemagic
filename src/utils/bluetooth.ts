import {Platform} from 'react-native';

import * as Ble from 'dpld-ble';

export async function sendPackets(deviceId: string, packets: string[]): Promise<void> {
  const [characteristic, service] = await getCharacteristic(deviceId);

  for await (const packet of packets) {
    await Ble.writeCharacteristic(packet, deviceId, characteristic.uuid, service.uuid);
  }

  Ble.disconnect(deviceId);
}

async function getCharacteristic(
  deviceId: string,
): Promise<readonly [Ble.BluetoothCharacteristic, Ble.BluetoothService]> {
  const services = await Ble.discoverServices(deviceId);
  const service = services.find((service) => transformCharacteristicUUID(service.uuid) === 'FEE0');

  if (!service) {
    throw new Error('FEE0 Service not found');
  }

  const characteristics = await Ble.discoverCharacteristics(deviceId, service.uuid);
  const characteristic = characteristics.find(
    (characteristic) => transformCharacteristicUUID(characteristic.uuid) === 'FEE1',
  );

  if (!characteristic) {
    throw new Error('FEE1 Characteristic not found');
  }

  return [characteristic, service] as const;
}

const transformCharacteristicUUID = (uuid: string): string => {
  if (Platform.OS !== 'android') return uuid;
  const firstPart = uuid.split('-')[0]?.substring(4, 8) || '';
  if (!firstPart) throw new Error('Invalid UUID');
  return firstPart.toUpperCase();
};
