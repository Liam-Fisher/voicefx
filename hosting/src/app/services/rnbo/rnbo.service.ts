import { Injectable } from '@angular/core';
import * as RNBO from '@rnbo/js';
import { AudioService } from '../webAudio/audio.service';
import { DatabaseService } from '../database.service';

import {
  BufferLoadData,
  DeviceLoadData
} from '../../types/rnbo/service';
import { SyncEventName, eventData } from '../../types/rnbo/events';
import { BehaviorSubject } from 'rxjs';
import DialUI from './inputs/elements/dial';
import NumberUI from './inputs/elements/number';
import SliderUI from './inputs/elements/slider';
import { ToggleUI } from './inputs/elements/toggle';
import { SelectUI } from './inputs/elements/select';
import PianoUI from './inputs/elements/kslider';
import EnvelopeUI from './inputs/elements/function';
import { EnumUIData, ListUIData, NumberUIData } from './types/dataTypes';
import { setDevice, setDeviceBuffer } from './helpers/setters';
import { initializeInportUIs, initializeParameterUIs } from './helpers/ui';
import { emit_sync_event } from './helpers/eventEmitters';
/* type Metadata = {meta: Record<string, string>};
type Parameter = RNBO.IParameterDescription & Metadata;
type MessageInport =  Metadata & {
  tag: string;
}; */
type UIClasses = DialUI|NumberUI|SliderUI|ToggleUI|SelectUI|PianoUI|EnvelopeUI;
@Injectable({
  providedIn: 'root',
})
export class RnboService {
  deviceFolders = new BehaviorSubject<string[]>([]);
  deviceList = new BehaviorSubject<string[]>([]);
  patcher!: RNBO.IPatcher;

  // Active Device
  device!: RNBO.BaseDevice;
  isDeviceLoaded = new BehaviorSubject(false);
  deviceID = new BehaviorSubject<string>('');
  //bufferIDs = new BehaviorSubject<string[]>([]);
  //  use dials
  numberParameters: NumberUIData[] = [];
  // use select menus
  enumParameters: EnumUIData[] = [];
  // various nexusUI elements
  listInports: ListUIData[] = [];

  // use  <select> to set tag and <input> to set message
 // messageInports: MessageUIData[] = [];
  uiNames: string[] = [];
  uiElements: UIClasses[] = [];
  //uis: Map<string, UIClasses> = new Map();
  // messageInports: Set<string> = new Set();
  isUILoaded = new BehaviorSubject(false);
  isTouchDevice = new BehaviorSubject(false);
  constructor(
    private webAudio: AudioService,
    private db: DatabaseService
  ) //private styling: StylingService
  {
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    console.log(`is Touch Device ${isTouchDevice}`);
  }
  async getStyle() {

  }
  async loadDeviceList(folder: string) {
    return this.db.listStorageNames(`rnbo_devices/${folder}`);
  }
  async loadRecordingsList() {
    return await this.db.listStorageNames(`media/userRecordings`);
  }
  async loadBuffer(data: BufferLoadData) {
    await setDeviceBuffer.call(this, data);
  }
  async loadDevice(data: DeviceLoadData): Promise<RNBO.BaseDevice | null> {
    this.isDeviceLoaded.next(false);
    console.log(`loading device ${data.id}`);
    await setDevice.call(this, data);
    console.log(`loading uis`);
    initializeParameterUIs.call(this);
    initializeInportUIs.call(this);
    console.log(`ui names`);
    console.log(this.uiNames);
/*     this.uiElements.forEach((ui) => {
      console.log('logging meta');
      console.log(ui.meta);
    }); */

    this.isDeviceLoaded.next(true);
    return this.device;
  }
  createUIElements()  {
    for(let ui of this.uiElements) {
      ui.createElement();
    }
  }
  emitSyncEvent(name: SyncEventName, data: eventData) {
    console.log(`emitting event`);
    try {
      let event = emit_sync_event(name, data);
      this.device.scheduleEvent(event);
    } catch (err) {
      console.error(err);
    }
  }
  debugOutports() {
    this.device.messageEvent.subscribe((evt) => console.log(`${evt.tag}: ${evt.payload} at ${evt.time}`));

  }
  get context(): AudioContext {
    return this.webAudio.ctx;
  }
  get bufferIDs(): string[] {
    return this.device.dataBufferDescriptions.map(
      (dBD: RNBO.ExternalDataInfo) => dBD.id
    );
  }
  get inports(): string[] {
    return this.device?.inports.map((inport) => inport.tag) ?? [];
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