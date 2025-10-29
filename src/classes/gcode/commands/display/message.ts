import { GCodeCommand } from '../_command';
import { GCodeCommandPrefix } from '../_index';

export class MessageDisplayGCodeCommand extends GCodeCommand {
  constructor(message: string) {
    super(GCodeCommandPrefix.M, 117, [message]);
  }
}
