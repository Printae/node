import { GCodeCommandPrefix } from './_index';

export class GCodeCommand {
  protected _prefix: GCodeCommandPrefix;
  protected _number: number;

  constructor(prefix: GCodeCommandPrefix, number: number) {
    this._prefix = prefix;
    this._number = number;
  }

  get prefix(): GCodeCommandPrefix {
    return this._prefix;
  }

  get number(): number {
    return this._number;
  }

  toString() {
    return `${this._prefix}${this._number};`;
  }
}
