import { GCodeCommand } from '../_command';
import { GCodeCommandPrefix } from '../_index';

export class InfoFirmwareGCodeCommand extends GCodeCommand {
  constructor() {
    super(GCodeCommandPrefix.M, 115);
  }

  processOutput(output: string) {
    const lines = output.split('\n');

    const fwInfo = lines.find((line) => line.startsWith('FIRMWARE_NAME:'));
    const capLines = lines.filter((line) => line.startsWith('Cap:'));

    if (!fwInfo) return {};
    if (capLines.length < 1) return {};

    // Parse firmware info
    // Split at spaces and then join again all chunks separated by XXXXX:xxx
    const fwParts = fwInfo.split(' ');
    const entries: [string, string][] = [];
    let buf = '';
    let key = '';

    for (const part of fwParts) {
      if (part.includes(':') && part.split(':')[0].match(/^[A-Z_]+$/)) {
        if (buf.length > 0) {
          entries.push([key.trim(), buf.trim()]);
        }

        const [k, v] = part.split(':');
        key = k;
        buf = v;
      } else buf += ' ' + part;
    }

    return {
      firmware: Object.fromEntries(entries),
      capabilities: Object.fromEntries(
        capLines
          .map((l) => l.replace('Cap:', '').split(':') as [string, string])
          .map(([k, v]) => [k, v === '1']),
      ),
    };
  }
}
