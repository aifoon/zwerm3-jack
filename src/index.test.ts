/**
 * Defining some tests for our package
 */

import { getJackPaths } from '.';
import { isJackDmpRunning, startJackDmpAsync } from './jack/JackD';
import { isJacktripRunning } from './jack/Jacktrip';
import { startJacktripClient } from './jack/JacktripClient';
import { getJacktripPaths } from './jack/JacktripPaths';
import { killAllProcesses, killJack } from './jack/Kill';

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
  test('Running Jack', async () => {
    await killJack();
    await startJackDmpAsync(
      {
        device: '',
        channels: 2,
        bufferSize: 256,
        sampleRate: 48000,
      },
      {}
    );
    expect(await isJackDmpRunning()).toBeTruthy();
    await killJack();
  });

  test('Running Jacktrip', async () => {
    await killAllProcesses();
    await startJackDmpAsync(
      {
        device: '',
        channels: 2,
        bufferSize: 256,
        sampleRate: 48000,
      },
      {}
    );
    await startJacktripClient({}, {});
    expect(await isJacktripRunning()).toBeTruthy();
    await killAllProcesses();
  });
});
