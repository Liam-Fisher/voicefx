import { Injectable } from '@angular/core';
import * as RNBO from '@rnbo/js';
import { AudioService } from './audio.service';
import { DatabaseService } from './database.service';

import {
  BufferLoadData,
  BufferLoadOptions,
  DeviceLoadOptions,
} from '../types/rnbo/service';
import { emit_sync_event } from '../helpers/rnbo/eventEmitters';
import { SyncEventName, eventData } from '../types/rnbo/events';
import { StylingService } from './styling.service';
import { InputAttributes, InputType } from '../types/rnbo/deviceInput';
import {
  EnumParameterUI,
  ListInportUI,
  MessageInportUI,
  NumberParameterUI,
} from '../helpers/rnbo/inputs';
import { sortInports, sortParams } from '../helpers/rnbo/sorters';

/* type Metadata = {meta: Record<string, string>};
type Parameter = RNBO.IParameterDescription & Metadata;
type MessageInport =  Metadata & {
  tag: string;
}; */
@Injectable({
  providedIn: 'root',
})
export class RnboService {
  device!: RNBO.BaseDevice;
  patcher!: RNBO.IPatcher;
  //  use dials
  numberParameters: NumberParameterUI[] = [];
  // use select menus
  enumParameters: EnumParameterUI[] = [];
  // use  <select> to set tag and <input> to set message
  messageInports: MessageInportUI[] = [];
  // various nexusUI elements
  listInports: ListInportUI[] = [];
  constructor(
    private webAudio: AudioService,
    private db: DatabaseService,
    private styling: StylingService
  ) {}
  async loadDeviceList(folder: string) {
    let deviceList = await this.db.listStorageNames(`rnbo_devices/${folder}`);
    return deviceList;
  }
  async loadRecordingsList() {
    console.log(`loading recordings list`);
    let recordingList = await this.db.listStorageNames(`media/userRecordings`);
    recordingList.forEach((name: string) =>
      console.log(`loaded user recording ${name} `)
    );
    return recordingList;
  }
  async loadDevice(
    id: string,
    options?: DeviceLoadOptions
  ): Promise<RNBO.BaseDevice | null> {
    try {
      const context = this.webAudio.ctx;
      this.patcher = (await this.db.loadJSON(
        `rnbo_devices/${options?.folder}/${id}.export`
      )) as RNBO.IPatcher;
      this.device = await RNBO.createDevice({ context, patcher: this.patcher });
      this.webAudio.addNode(id, this.device.node, options?.connections);
      console.log(`----------------logging rnbo patcher----------------`);
      console.log(this.patcher);
      console.log(`----------------logging rnbo device-----------------`);
      console.log(this.device);
    } catch (err) {
      throw err;
    }
    sortParams.call(this);
    sortInports.call(this);
    return this.device;
  }
  async loadBuffer(
    data: BufferLoadData,
    channelCount?: number
  ): Promise<void> {
    let buffer: AudioBuffer | Float32Array | ArrayBuffer;
    let { buffer_id, buffer_src } = data;
    try {
      buffer =
        typeof buffer_src === 'string'
          ? await this.db.loadAudio(this.webAudio.ctx, buffer_src)
          : buffer_src;

      let buf_id =
        typeof buffer_id === 'string'
          ? buffer_id
          : this.device.dataBufferDescriptions[buffer_id]?.id;

      if (buffer instanceof ArrayBuffer || buffer instanceof Float32Array) {
        let cc = channelCount ?? 1;
        let sr = this.webAudio.ctx?.sampleRate ?? 44100;
        console.log(
          `creating buffer with channelCount: ${cc} and sampleRate: ${sr}`
        );
        console.log(buffer);
        return this.device.setDataBuffer(buf_id, buffer, cc, sr);
      }
      return this.device.setDataBuffer(buf_id, buffer);
    } catch (err) {
      console.error(err);
    }
  }
  emitSyncEvent(name: SyncEventName, data: eventData) {
    console.log(`emitting event`);
    try {
      let event = emit_sync_event(name, data);
      console.log(`scheduling event,...`);
      console.log(event);
      this.device.scheduleEvent(event);
    } catch (err) {
      console.error(err);
    }
  }
}

/* 

  addEventHandler<Evt extends ListenableEventName>(
    device_id: string,
    eventType: Evt,
    handler: (e: ListenableEventTypes[Evt]) => void
  ) {
      let device = this.getDevice(device_id);
      device[subscriber].subscribe(handler as ListenablEventHandler) as RNBO.IEventSubscription
      let activeSubscriptions = this.subscriptions.get(device_id) ?? {
        message: [],
        preset: [],
        parameter: []
      };
      let subscriber = ListenableEventSubscribers[eventType];
      activeSubscriptions[eventType].push(
        device[subscriber].subscribe(handler as ListenablEventHandler) as RNBO.IEventSubscription
      );
      this.subscriptions.set(device_id, activeSubscriptions);
  }
setParameter(
    device_name: string,
    parameter_id: string,
    value: number | string,
    isNormalized?: boolean
  ) {
    const device = this.devices.get(device_name);
    if (!device) {
      throw new Error(`device with id ${device_name} does not exist`);
    } else {
      let param = device.parametersById.get(parameter_id);
      if (!param) {
        throw new Error(`param with id ${parameter_id} does not exist`);
      } else {
        if (typeof value === 'string') {
          if (param instanceof RNBO.EnumParameter) {
            param.enumValue = value;
          } else {
            throw new Error(
              `param with id ${parameter_id} cannot be set to string value ${value}, as it is not an EnumParameter type `
            );
          }
        } else {
          if (param instanceof RNBO.NumberParameter) {
            if (isNormalized) {
              param.normalizedValue = value;
            } else {
              param.value = value;
            }
          }
        }
      }
    }
  } */
