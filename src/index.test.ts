/**
 * Defining some tests for our package
 */

import { getJackPaths } from '.';
import { isJackDmpRunning, startJackDmpAsync } from './jack/JackD';
import { isJacktripRunning } from './jack/Jacktrip';
import { startJacktripP2PServer } from './jack/JacktripP2PServer';
import { startJacktriptP2PMultipleClientsAsync } from './jack/JacktripP2PClient';
import { getJacktripPaths } from './jack/JacktripPaths';
import { getJackSystemClients } from './jack/JackSystemClients';
import {
  getRunningProcesses,
  killAllProcesses,
  killProcessByPid,
} from './jack/Kill';
import { connectChannel, disconnectChannel } from './jack/JackChannels';

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

  // test('Disconnecting/Connecting audio connections', () => {
  //   const channels = [1, 2, 5, 9, 8, 7];
  //   // for (let i = 0; i < 1; i += 1) {

  //   channels.forEach((channel) => {
  //     const source = `system:capture_${channel}`;
  //     const destination = `bee${channel}:send_1`;
  //     disconnectChannel({
  //       source,
  //       destination,
  //     });
  //   });

  //   channels.forEach((channel) => {
  //     const source = `system:capture_${channel}`;
  //     const destination = `bee${channel}:send_1`;
  //     connectChannel({
  //       source,
  //       destination,
  //     });
  //   });
  //   // }
  // });
});

describe('Killing', () => {
  test('Start Jack and Kill by pid', async () => {
    // start jack
    const runningCommand = await startJackDmpAsync(
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

    await killProcessByPid(runningCommand.pid);
    const jackIsRunning = await isJackDmpRunning();
    expect(jackIsRunning).toBeFalsy();
  });
});

describe('Jack and Jacktrip', () => {
  beforeEach(async () => {
    await killAllProcesses();
  });

  afterAll(async () => {
    await killAllProcesses();
  });

  test('Running Jack and check if we got capture and playback devices', async () => {
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

    const systemClients = getJackSystemClients();

    expect(systemClients.captureChannels.length).toBeGreaterThan(0);
    expect(systemClients.playbackChannels.length).toBeGreaterThan(0);
  });

  test('Running Jack and multiple Jacktrip clients', async () => {
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

    // start jacktrip
    const runningCommands = await startJacktriptP2PMultipleClientsAsync({}, [
      { localPort: 4465, clientName: 'Client1', host: 'localhost' },
      { localPort: 4466, clientName: 'Client2', host: 'localhost' },
      { localPort: 4467, clientName: 'Client3', host: 'localhost' },
    ]);

    // get running commands
    const runningJacktripProcesses = await getRunningProcesses('jacktrip');

    // check if the amount of started processes are equal than running commands
    expect(runningJacktripProcesses).toHaveLength(runningCommands.length);
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

    // start jacktrip
    await startJacktripP2PServer({}, {});

    // check if jack and   jacktrip are running
    const jackIsRunning = await isJackDmpRunning();
    const jacktripIsRunning = await isJacktripRunning();

    // expect jack and jacktrip to be running
    expect(jackIsRunning).toBeTruthy();
    expect(jacktripIsRunning).toBeTruthy();
  });
});
