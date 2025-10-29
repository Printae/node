import { GCodeCommand } from '../_command';
import { GCodeCommandPrefix } from '../_index';

export class HomeMovementGCodeCommand extends GCodeCommand {
  constructor() {
    super(GCodeCommandPrefix.G, 28);
  }
}
