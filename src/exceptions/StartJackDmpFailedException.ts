/**
 * An exception to raise if Jack didn't start correctly
 */

import { Exception } from './Exception';

export class StartJackDmpFailedException extends Exception {
  constructor(message: string) {
    super(`Starting the Jack Daemon failed; ${message}`);
    this.name = 'StartJackDmpFailedException';
  }
}
