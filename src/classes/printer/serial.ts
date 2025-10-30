import { wait } from 'src/utils/timers';
import { Printer } from './printer';

export class PrinterSerial {
  private _printer: Printer;

  private _queue: [string, ((s: string) => void) | null][] = [];

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

    this._printer.rawSerial.flush();
    this._printer.rawSerial.send(cmd[0]);
    await this._printer.rawSerial.awaitOk();

    const res = this._printer.rawSerial.getBuffer();

    this._queue.shift();

    if (cmd[1]) cmd[1](res);
  }

  private queuePush(str: string, callback: ((s: string) => void) | null) {
    this._queue.push([str, callback]);
  }

  public queue = {
    push: (str: string) => this.queuePush(str, null),
    awaitPush: (str: string) =>
      new Promise<string>((res) => this.queuePush(str, res)),
  };
}
