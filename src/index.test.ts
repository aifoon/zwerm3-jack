/**
 * Defining some tests for our package
 */

/* eslint-disable no-console */
/* eslint-disable jest/no-focused-tests */
import { isJackDmpRunning, startJackDmpAsync } from './jack/JackD';
import { isJacktripRunning } from './jack/Jacktrip';
import { startJacktripP2PServer } from './jack/JacktripP2PServer';
import { startJacktriptP2PMultipleClientsAsync } from './jack/JacktripP2PClient';
import { getJacktripPaths } from './jack/JacktripPaths';
import { getJackSystemClients } from './jack/JackSystemClients';
import { getRunningProcesses, killAllProcesses } from './jack/Kill';
import { startJacktripHubServerAsync } from './jack/JacktripHubServer';
import Zwerm3Jack from './Zwerm3Jack';
import { HubPatchMode } from './enums';
import { startJacktripHubClientAsync } from './jack/JacktripHubClient';

/**
 * Internal stuff
 */

jest.setTimeout(60000);
const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

describe('Paths', () => {
  test('Testing Jacktrip paths', () => {
    const jacktripPaths = getJacktripPaths();
    expect(jacktripPaths).toHaveProperty('jackTrip');
  });
});

describe('Jack and Jacktrip', () => {
  beforeEach(async () => {
    Zwerm3Jack.jackFolderPath = '/opt/homebrew/bin';
    await killAllProcesses();
  });

  afterAll(async () => {
    await killAllProcesses();
  });

  test.only('Simulation of multiple Jacktrip Hub Servers', async () => {
    await killAllProcesses();

    /**
     * 1. Start Jacktrip Hub Servers
     */

    const jacktripServerConfig = {
      channels: 8,
      debug: false,
      queueBuffer: 32,
      realtimePriority: true,
      connectDefaultAudioPorts: false,
      hubPatchMode: HubPatchMode.NoConnections,
      bitRate: 16,
    };

    // start jacktrip
    console.log('Starting Jacktrip Hub Server 1...');
    await startJacktripHubServerAsync(
      { ...jacktripServerConfig, localPort: 4495 },
      {}
    );

    console.log('Starting Jacktrip Hub Server 2...');
    await startJacktripHubServerAsync(
      { ...jacktripServerConfig, localPort: 4496 },
      {}
    );

    /**
     * 2. Start Jack (for client)
     */

    await startJackDmpAsync(
      {
        // device: '',
        // inputChannels: 1,
        // outputChannels: 2,
        bufferSize: 512,
        sampleRate: 44100,
        periods: 2,
      },
      {}
    );

    // check if jack is running
    const jackIsRunning = await isJackDmpRunning();

    // vlalidate
    if (!jackIsRunning) {
      throw new Error('Jack is not running');
    }

    /**
     * 3. Start Jacktrip Hub Client
     */

    const jacktripClientConfig = {
      debug: false,
      killAllJacktripBeforeStart: false,
      queueBuffer: 4,
      realtimePriority: true,
      bitRate: 16,
      host: 'localhost',
      receiveChannels: 1,
      sendChannels: 4,
      redundancy: 1,
      connectDefaultAudioPorts: false,
      compressor: true,
    };

    console.log('Connecting clients to Hub Server 1...');
    await startJacktripHubClientAsync(
      {
        ...jacktripClientConfig,
        clientName: 'kweenb1',
        localPort: 4464,
        remotePort: 4495,
      },
      {}
    );

    console.log('Connecting clients to Hub Server 2...');
    await startJacktripHubClientAsync(
      {
        ...jacktripClientConfig,
        clientName: 'kweenb2',
        localPort: 4465,
        remotePort: 4496,
      },
      {}
    );

    // wait for 30 seconds (so you can see behavior in QJackCtl)
    await delay(40 * 1000);
  });

  test('Running Jack and multiple Jacktrip clients', async () => {
    await killAllProcesses();

    // start jack
    await startJackDmpAsync(
      {
        device: '',
        inputChannels: 1,
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
        inputChannels: 1,
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

    // expect systemclients
    const systemClients = await getJackSystemClients();
    expect(systemClients.captureChannels.length).toBeGreaterThan(0);
    expect(systemClients.playbackChannels.length).toBeGreaterThan(0);

    // expect jack and jacktrip to be running
    expect(jackIsRunning).toBeTruthy();
    expect(jacktripIsRunning).toBeTruthy();
  });
});
