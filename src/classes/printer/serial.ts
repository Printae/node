import { wait } from 'src/utils/timers';
import { Printer } from './printer';

export class PrinterSerial {
  private _printer: Printer;

  private _queue: [string, (() => void) | null][] = [];

  constructor(printer: Printer) {
    this._printer = printer;

    void this.startLoop();
  }

  private async startLoop() {
    while (true) {
      await this.processNext();
    }
  }

  private async processNext() {
    if (this._queue.length == 0) return await wait(10);

    const cmd = this._queue[0];

    this._printer.rawSerial.send(cmd[0]);
    await this._printer.rawSerial.awaitOk();

    this._queue.shift();

    if (cmd[1]) cmd[1]();
  }

  private queuePush(str: string, callback: (() => void) | null) {
    this._queue.push([str, callback]);
  }

  public queue = {
    push: (str: string) => this.queuePush(str, null),
    awaitPush: (str: string) =>
      new Promise<void>((res) => this.queuePush(str, res)),
  };
}
