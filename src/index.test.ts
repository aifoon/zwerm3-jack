/**
 * Defining some tests for our package
 */

import { getJackPaths } from '.';
import { isJackDmpRunning, startJackDmpAsync } from './jack/JackD';
import { isJacktripRunning } from './jack/Jacktrip';
import { startJacktripClientAsync } from './jack/JacktripClient';
import { getJacktripPaths } from './jack/JacktripPaths';
import { killAllProcesses } from './jack/Kill';

jest.setTimeout(60000);

describe('Paths', () => {
  test('Testing Jack paths', () => {
    const jackPaths = getJackPaths();
    expect(jackPaths).toMatchObject({
      jackConnect: '/usr/local/bin/jack_connect',
      jackDisconnect: '/usr/local/bin/jack_disconnect',
      jackDmp: '/usr/local/bin/jackd',
      jackLsp: '/usr/local/bin/jack_lsp',
    });
  });

  test('Testing Jacktrip paths', () => {
    const jacktripPaths = getJacktripPaths();
    expect(jacktripPaths).toHaveProperty('jackTrip');
  });
});

describe('Jack and Jacktrip', () => {
  beforeEach(async () => {
    await killAllProcesses();
  });

  afterAll(async () => {
    await killAllProcesses();
  });

  test('Running Jack and Jacktrip', async () => {
    await killAllProcesses();

    // start jack
    await startJackDmpAsync(
      {
        device: '',
        inputChannels: 2,
        outputChannels: 2,
        bufferSize: 1024,
        sampleRate: 48000,
        periods: 2,
      },
      {}
    );

    // start jakcktrip
    await startJacktripClientAsync({}, {});

    // check if jack and jacktrip are running
    const jackIsRunning = await isJackDmpRunning();
    const jacktripIsRunning = await isJacktripRunning();

    // expect jack and jacktrip to be running
    expect(jackIsRunning).toBeTruthy();
    expect(jacktripIsRunning).toBeTruthy();
  });
});
