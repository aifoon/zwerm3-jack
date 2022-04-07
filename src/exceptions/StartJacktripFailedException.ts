/**
 * An exception to raise if jacktrip didn't start correctly
 */

import { Exception } from './Exception';

export class StartJacktripFailedException extends Exception {
  constructor(message: string) {
    super(`Starting Jacktrip failed; ${message}`);
    this.name = 'StartJacktripFailedException';
  }
}
