import { EnumParameter } from '@rnbo/js';
import * as Nexus from 'nexusui';
import { rgbToHex } from '../helpers/styling';
import { EnumParameterUI } from './core';
import { CustomRNBOMetadata } from '../dataTypes';
export class ToggleUI extends EnumParameterUI<'toggle'> {
  constructor(
    override meta: CustomRNBOMetadata<'Enum', 'toggle'>,
    override param: EnumParameter
  ) {
    super(meta, param);
  }
  createElement() {
    // the default mode 'relative' is always used
    this.element = new Nexus.Toggle(this.elementId, {
      size: this.size,
      state: this.value,
    });
    if (this.meta?.checkedcolor) {
      this.element.colorize('accent', rgbToHex(this.meta?.checkedcolor));
    }
    if (this.meta?.uncheckedcolor) {
      this.element.colorize('fill', rgbToHex(this.meta.uncheckedcolor));
    }
    this.linkElementToParam();
  }
  parseEvent(v: boolean): number {
    return +v;
  }
  get enumValue(): string {
    return `${this.param.enumValues[+this.element.state]}`;
  }
}
