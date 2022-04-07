/**
 * An exception to raise if the samplerate is not valid
 */

import { Exception } from './Exception';

export class SampleRateNotValidException extends Exception {
  constructor() {
    super(
      'The SampleRate is not correct. Correct values are 22050 | 32000 | 44100 | 48000 | 88200 | 96000 | 192000.',
    );
    this.name = 'SampleRateNotValidException';
  }
}
