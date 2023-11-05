import { IPatcher, createDevice } from '@rnbo/js';
import { BufferLoadData, DeviceLoadData } from 'src/app/types/rnbo/service';
import { getAudioBuffer, getBufferID } from './getters';

export async function setDeviceBuffer(data: BufferLoadData): Promise<void> {
  let buffer_id: string;
  let buffer: AudioBuffer | ArrayBuffer;
  let { id, src, channelCount } = data;
  try {
    buffer = await getAudioBuffer.call(this, src);
    buffer_id = await getBufferID.call(this, id);

    if (buffer instanceof AudioBuffer) {
      return this.device.setDataBuffer(buffer_id, buffer);
    }
    channelCount ??= 1;
    let sr = this.webAudio.ctx?.sampleRate ?? 44100;
    return this.device.setDataBuffer(id, buffer, channelCount, sr);
  } catch (err) {
    console.error(err);
  }
}

export async function setPatcher(id: string, folder: string) {
  let path = `rnbo_devices/${folder}/${id}.export`;
  this.patcher = (await this.db.loadJSON(path)) as IPatcher;
}
export async function setDevice(data: DeviceLoadData) {
  let { id, folder, patcher, connections } = data;
  this.patcher = patcher ?? (await this.db.loadJSON(`rnbo_devices/${folder}/${id}.export`)) as IPatcher;
  try {
    this.device = await createDevice({
      context: this.context,
      patcher: this.patcher,
    });
    this.webAudio.addNode(id, this.device.node, connections);
  } catch (err) {
    throw err;
  }
  
}
