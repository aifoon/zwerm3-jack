/**
 * Defining some tests for our package
 */

import { getJackPaths } from '.';
import { isJackDmpRunning, startJackDmpAsync } from './jack/JackD';
import { isJacktripRunning } from './jack/Jacktrip';
import { startJacktripClientAsync } from './jack/JacktripClient';
import { getJacktripPaths } from './jack/JacktripPaths';
import { killAllProcesses } from './jack/Kill';

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
  test('Running Jack and Jacktrip', async () => {
    // kill all possible jack and jacktrip processes
    await killAllProcesses();

    // start jack
    await startJackDmpAsync(
      {
        device: '',
        channels: 2,
        bufferSize: 256,
        sampleRate: 48000,
      },
      {}
    );

    // start jakcktrip
    await startJacktripClientAsync({}, {});

    // check if jack and jacktrip are running
    const jackIsRunning = await isJackDmpRunning();
    const jacktripIsRunning = await isJacktripRunning();

    // kill the prcocesses if them are running
    await killAllProcesses();

    // expect jack and jacktrip to be running
    expect(jackIsRunning).toBeTruthy();
    expect(jacktripIsRunning).toBeTruthy();
  });
});
