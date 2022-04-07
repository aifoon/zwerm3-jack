/**
 * An exception to raise if the bitrate is not valid
 */

import { Exception } from './Exception';

export class BitRateNotValidException extends Exception {
  constructor() {
    super('The BitRate is not correct. Correct values are 8 | 16 | 24 | 32.');
    this.name = 'BitRateNotValidException';
  }
}
