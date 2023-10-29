import { ConnectionMap } from "../rnboTypes";
// Data (required), Message (some required), Options (none required)

export interface BufferLoadData {
    buffer_id: string | number,
    buffer_src: string | AudioBuffer | ArrayBuffer | Float32Array,
    
}
export interface BufferLoadOptions {
    device_id?: string
    channelCount?: number
}

export interface DeviceLoadOptions {
    folder?: string,
    logDevice?: boolean;
    logPatcher?: boolean;
    connections?: ConnectionMap;
  }