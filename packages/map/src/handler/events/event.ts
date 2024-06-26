// tslint:disable-next-line:no-submodule-imports
import { lodashUtil } from '@antv/l7-utils';
const { merge } = lodashUtil;
export class Event {
  public type: string;
  constructor(type: string, data: any = {}) {
    merge(this, data);
    this.type = type;
  }
}
