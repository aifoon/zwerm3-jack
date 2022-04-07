/**
 * An exception to raise if the buffersize is not valid
 */

import { Exception } from './Exception';

export class BufferSizeNotValidException extends Exception {
  constructor() {
    super(
      'The BufferSize is not correct. Correct values are 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096.',
    );
    this.name = 'BufferSizeNotValidException';
  }
}
