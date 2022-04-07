/**
 * An exception to raise if the hub patch mode is not valid
 */

import { Exception } from './Exception';

export class HubPatchModeNotValidException extends Exception {
  constructor() {
    super(
      'The Hub Patch Mode is not correct. Correct values are 0=server-to-clients, 1=client loopback, 2=client fan out/in but not loopback, 3=reserved for TUB, 4=full mix, 5=no auto patching.',
    );
    this.name = 'HubPatchModeNotValidException';
  }
}
