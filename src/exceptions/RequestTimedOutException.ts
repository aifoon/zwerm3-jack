/**
 * An exception to raise if the request timed out
 */

import { Exception } from './Exception';

export class RequestTimedOutException extends Exception {
  constructor(message: string) {
    super(message);
    this.name = 'RequestTimedOutException';
  }
}
