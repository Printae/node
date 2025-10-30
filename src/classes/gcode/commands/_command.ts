import { GCodeCommandPrefix } from './_index';

export abstract class GCodeCommand {
  protected _prefix: GCodeCommandPrefix;
  protected _number: number;
  protected _args: string[];

  constructor(prefix: GCodeCommandPrefix, number: number, args: string[] = []) {
    this._prefix = prefix;
    this._number = number;
    this._args = args;
  }

  get prefix(): GCodeCommandPrefix {
    return this._prefix;
  }

  get number(): number {
    return this._number;
  }

  toString() {
    return `${this._prefix}${this._number} ${this._args.join(' ')};`;
  }

  processOutput(output: string): unknown {
    return output as unknown;
  }
}
