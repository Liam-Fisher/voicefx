
import * as Nexus from 'nexusui';
import { rgbToHex } from '../helpers/styling';
import { CustomRNBOMetadata } from '../dataTypes';
import { ListInportUI } from './core';
import { BaseDevice } from '@rnbo/js';

export default class EnvelopeUI extends ListInportUI<'function'> {
  domain: number;
  range: [number, number];
  constructor(
    override meta: CustomRNBOMetadata<'List', 'function'>,
    tag: string,
    device: BaseDevice
  ) {
    super(meta, tag, device);
    this.domain = this.meta?.domain ?? 1000;
    this.range = this.meta?.range ?? [0, 1];
  }
  createElement() {
    this.element = new Nexus.Envelope(this.elementId, { size: this.size });
    if (this.meta?.linecolor) {
      this.element.colorize('accent', rgbToHex(this.meta.linecolor));
    }
    if (this.meta?.bgcolor) {
      this.element.colorize('fill', rgbToHex(this.meta.bgcolor));
    }
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
