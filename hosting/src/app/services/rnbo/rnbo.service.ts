import { Injectable } from '@angular/core';
import * as RNBO from '@rnbo/js'
import { AudioService } from '../webAudio/audio.service';
import { DatabaseService } from '../database.service';

import { BufferLoadData, DeviceLoadData } from '../../types/rnbo/service';
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
import { setDevice, setDeviceBuffer, setPatcher, setPresets } from './helpers/setters';
import { initializeInportUIs, initializeParameterUIs } from './helpers/ui';
import { emit_sync_event } from './helpers/eventEmitters';
/* type Metadata = {meta: Record<string, string>};
type Parameter = RNBO.IParameterDescription & Metadata;
type MessageInport =  Metadata & {
  tag: string;
}; */
type UIClasses =
  | DialUI
  | NumberUI
  | SliderUI
  | ToggleUI
  | SelectUI
  | PianoUI
  | EnvelopeUI;
@Injectable({
  providedIn: 'root',
})
export class RnboService {
  // for debugging user devices
  debugMode = new BehaviorSubject(false);

  patcher!: RNBO.IPatcher;

  // Active Device
  device!: RNBO.BaseDevice;
  isDeviceLoaded = new BehaviorSubject(false);
  deviceID = new BehaviorSubject<string>('');

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
  inportInput = new BehaviorSubject<[string, ...number[]]>(['', 0]);
  parameterInput = new BehaviorSubject<[string, ...number[]]>(['', 0]);
  loadedBufferIDs = new BehaviorSubject([]);
  loadIDIndex = 0;

  activeStyle: Record<string, any> = {};
  presetNames: string[] = [];
  presets!: Record<string, RNBO.IPreset>;
  
  currentSelection = new BehaviorSubject<string>('robot');
  constructor(
    private webAudio: AudioService,
    private db: DatabaseService //private styling: StylingService
  ) {
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    console.log(`is Touch Device ${isTouchDevice}`);
  }

  async loadBuffer(data: BufferLoadData) {
    await setDeviceBuffer.call(this, data);
  }
  setDevicePreset(name: string) {
    if(!this.device || !this.presets?.[name]) return false;
    this.device.setPreset(this.presets[name]);
    return true;
  }
  
  async loadDevice(data: DeviceLoadData): Promise<RNBO.BaseDevice> {
    this.isDeviceLoaded.next(false);
    console.log(`loading device ${data.id}`);
    await setPatcher.call(this, data);
    await setDevice.call(this, data);
    setPresets.call(this);
    console.log(`loading uis`);
    this.uiElements = [];
    this.uiNames = [];
    initializeParameterUIs.call(this);
    initializeInportUIs.call(this);
    console.log(`ui names`);
    console.log(this.uiNames);
    /*     this.uiElements.forEach((ui) => {
      console.log('logging meta');
      console.log(ui.meta);
    }); */
    this.deviceID.next(data.id);
    this.isDeviceLoaded.next(true);
    this.debugOutports();
    return this.device;
  }
  createUIElements() {
    for (let ui of this.uiElements) {
      ui.createElement();
      if(ui.inputType === 'inport') {
        ui.linkElementToInput(this.inportInput);
      }
      else {
        ui.linkElementToInput(this.parameterInput);
      }
    }
    this.inportInput.subscribe(([target, ...data]) => {
      this.emitSyncEvent('message', [target, ...data]);
    });
    
    this.parameterInput.subscribe(([target, ...data]) => {
      let param = this.device.parametersById.get(target);
      if(param) {
        param.value = data[0];
      }
    });
  }
  emitSyncEvent(name: SyncEventName, data: eventData) {
    try {
      let event = emit_sync_event(name, data);
      this.device.scheduleEvent(event);
    } catch (err) {
      console.error(err);
    }
  }
  async connectToRecording() {
    const ids = this?.bufferIDs;
        try {
          if(!ids?.length) {
            throw new Error(`no buffer ids found`);
          }
          this.loadIDIndex %= ids.length;
          const id = ids[this.loadIDIndex];
          const src = this.webAudio.recordingBuffer;
          console.log(`loaded into buffer id: ${id}`);
          await this.loadBuffer({ id, src }).then(() => this.loadIDIndex++);
        } catch (e) {
          console.error(e);
        }
  }
  debugOutports() {
    this.device.messageEvent.subscribe((evt) =>
      console.log(`${evt.tag}: ${evt.payload} at ${evt.time}`)
    );
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
  async audioForFile(path: string) {
    console.log(`getting audio for file ${path}`);
    const url = await this.db.getURL(path);
    
    console.log(`getting buffer at url ${url}`);
    const ctx = this.webAudio.ctx;
    const src = await RNBO.BaseDevice.fetchAudioData(url, ctx);
    
    console.log(`buffer duration ${src.duration}`);
    this.webAudio.recordingBuffer = src;
    this.webAudio.recordingDuration = src.duration;
    this.webAudio.isRecordingBufferLoaded.next(true);
    const id = this.bufferIDs[0];

    await this.loadBuffer({ id, src });
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
