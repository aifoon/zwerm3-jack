/**
 * An exception to raise if there is no internet
 */

import { Exception } from './Exception';

export class NoInternetException extends Exception {
  constructor() {
    super('There is no internet, please check connection.');
    this.name = 'NoInternetException';
  }
}
