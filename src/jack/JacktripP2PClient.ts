/**
 * This contains all the fun stuff to start a Jacktrip client
 */

import { spawn } from 'child_process';
import { BitRate, StartJacktripType } from '../enums';
import {
  RunningCommand,
  OptionalParams,
  JacktripP2PClientParams,
  JacktripP2PClient,
} from '../interfaces';
import { getJacktripPaths } from './JacktripPaths';
import { CLIParams } from '../CLIParams';
import {
  BitRateNotValidException,
  StartJacktripFailedException,
} from '../exceptions';
import { validateBitRate } from '../validators';
import { JACKTRIP_DEFAULT_CLIENT_NAME } from '../consts';
import { startJacktripAsync } from './JacktripAsync';

/**
 * Start a JackTrip P2P Client
 * @param param0 JacktripHubClientParams
 * @returns RunningCommand
 */
export const startJacktripP2PClient = (
  jacktripP2PClientParams: JacktripP2PClientParams,
  { onLog }: OptionalParams
): RunningCommand => {
  // Destructure the variables
  const {
    clientName = JACKTRIP_DEFAULT_CLIENT_NAME,
    host = 'localhost',
    channels = 2,
    debug = false,
    queueBuffer = 4,
    bitRate = BitRate.Sixteen,
    redundancy = 1,
    sendChannels = 2,
    receiveChannels = 2,
    realtimePriority = true,
    localPort = 4464,
    remotePort = 4464,
    connectDefaultAudioPorts = true,
  } = jacktripP2PClientParams;

  // Do some validation
  if (!validateBitRate(bitRate)) throw new BitRateNotValidException();

  // Get some information to work with
  const jacktripPaths = getJacktripPaths();
  const cliParams = new CLIParams();

  // Hub client mode
  cliParams.addParam({
    flag: '-c',
    value: host,
  });

  // Define the amount of channels (defaults 2)
  if (channels !== -1) {
    cliParams.addParam({
      flag: '-n',
      value: channels.toString(),
    });
  }

  // Wavetable repeat last packet instead of muting with zeroes if network packet droput happens
  cliParams.addParam({
    flag: '-z',
  });

  // Number of packets of input queue (defaults 4)
  cliParams.addParam({
    flag: '-q',
    value: queueBuffer.toString(),
  });

  // The bitrate (defaults 16)
  cliParams.addParam({
    flag: '-b',
    value: bitRate.toString(),
  });

  // Packet Redundancy to avoid glitches with packet losses (defaults 1)
  cliParams.addParam({
    flag: '-r',
    value: redundancy.toString(),
  });

  // Define the client's name
  cliParams.addParam({
    flag: '-J',
    value: clientName,
  });

  // Sets the local port
  cliParams.addParam({
    flag: '-B',
    value: localPort.toString(),
  });

  // Sets the remote port
  cliParams.addParam({
    flag: '-P',
    value: remotePort.toString(),
  });

  // If we don't want to connect the default audio ports
  if (!connectDefaultAudioPorts) {
    cliParams.addParam({
      flag: '-D',
    });
  }

  // Sets the receive channels
  cliParams.addParam({
    flag: '--receivechannels',
    value: receiveChannels.toString(),
  });

  // Sets the send channels
  cliParams.addParam({
    flag: '--sendchannels',
    value: sendChannels.toString(),
  });

  // Sets debug mode
  if (debug) {
    cliParams.addParam({
      flag: '-V',
    });
  }

  // Enable realtime priority
  if (realtimePriority) {
    cliParams.addParam({
      flag: '--udprt',
    });
  }

  try {
    // Create the command
    const command = `** ${jacktripPaths.jackTrip} ${cliParams.toString()}`;

    // Let them know which command we are running
    if (onLog) onLog(`Running Command: ${command}`);

    // Return the running command
    const runningCommand = {
      command,
      process: spawn(jacktripPaths.jackTrip, cliParams.toStringArray()),
    };

    // Get the CLI outputs
    runningCommand.process.stdout.on('data', (data) => {
      if (onLog) onLog(data.toString());
    });
    runningCommand.process.stderr.on('data', (data) => {
      if (onLog) onLog(data.toString());
    });

    // Return the command
    return {
      command: runningCommand.command,
      pid: runningCommand.process.pid,
      params: jacktripP2PClientParams,
    };
  } catch (e: any) {
    throw new StartJacktripFailedException(e.message);
  }
};

/**
 * Starts a Jacktrip P2P Client and waits until the server is fully started.
 * @param param0 JacktripP2PClientParams
 * @returns Promise<RunningCommand>
 */
export const startJacktripP2PClientAsync = (
  jacktripP2PClientParams: JacktripP2PClientParams,
  optionalParams: OptionalParams
): Promise<RunningCommand> =>
  startJacktripAsync(
    jacktripP2PClientParams,
    StartJacktripType.P2PClient,
    optionalParams
  );

/**
 * Start Jacktrip with multiple clients, based on an array of localPorts
 * @param jacktripP2PClientParams
 * @param localPorts
 * @returns
 */
export const startJacktriptP2PMultipleClientsAsync = async (
  jacktripP2PClientParams: Omit<
    JacktripP2PClientParams,
    'localPort' | 'clientName'
  >,
  clients: JacktripP2PClient[]
): Promise<RunningCommand[]> => {
  // validate
  if (!clients || clients.length === 0) return [];

  // create a list of promises
  const startJacktripP2PClientAsyncParams: JacktripP2PClientParams[] =
    clients.map(
      ({ localPort, clientName }): JacktripP2PClientParams => ({
        ...jacktripP2PClientParams,
        localPort,
        clientName,
      })
    );

  // create the promises
  const startJacktripP2PClientAsyncPromises: Promise<RunningCommand>[] =
    startJacktripP2PClientAsyncParams.map((params) =>
      startJacktripP2PClientAsync(params, {})
    );

  // execute them all
  const runningCommands: RunningCommand[] = await Promise.all(
    startJacktripP2PClientAsyncPromises
  );

  // return the running commands
  return runningCommands;
};
