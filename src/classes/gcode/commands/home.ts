import { GCodeCommand } from './_command';
import { GCodeCommandPrefix } from './_index';

export class HomeGCodeCommand extends GCodeCommand {
  constructor() {
    super(GCodeCommandPrefix.G, 28);
  }
}
