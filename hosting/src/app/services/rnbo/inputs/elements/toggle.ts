import { EnumParameter } from '@rnbo/js';
import * as Nexus from 'nexusui';
import { CustomRNBOInputMetadata } from '../../types/dataTypes';
import { EnumParameterUI } from '../core';
export class ToggleUI extends EnumParameterUI<'toggle'> {
  constructor(
    override meta: CustomRNBOInputMetadata<'Enum', 'toggle'>,
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
  }
  parseEvent(v: boolean): number {
    return +v;
  }
  get enumValue(): string {
    return `${this.param.enumValues[+this.element.state]}`;
  }
}
