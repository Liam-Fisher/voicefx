
import * as Nexus from 'nexusui';
import { CustomRNBOInputMetadata } from '../../types/dataTypes';
import { BaseDevice } from '@rnbo/js';
import { ListInportUI } from '../core';

export default class EnvelopeUI extends ListInportUI<'function'> {
  domain: number;
  range: [number, number];
  constructor(
    override meta: CustomRNBOInputMetadata<'List', 'function'>,
    tag: string,
    device: BaseDevice
  ) {
    super(meta, tag, device);
    this.domain = this.meta?.domain ?? 1000;
    this.range = this.meta?.range ?? [0, 1];
  }
  createElement() {
    this.element = new Nexus.Envelope(this.elementId, { size: this.size });
    this.linkElementToInport();
  }
  toRange(y: number) {
    return (y - this.range[0]) * (this.range[1] - this.range[0]);
  }
  // playChordByIndex
  parseEvent(points: { x: number; y: number }[]): number[] {
    return points.flatMap((p) => [p.x * this.domain, this.toRange(p.y)]);
  }
}