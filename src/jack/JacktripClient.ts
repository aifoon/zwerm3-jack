/**
 * This contains all the fun stuff to start a Jacktrip client
 */

import { spawn } from 'child_process';
import { BitRate } from '../enums';
import {
  JacktripClientParams,
  RunningCommand,
  OptionalParams,
} from '../interfaces';
import { getJacktripPaths } from './JacktripPaths';
import { isJacktripRunning } from './Jacktrip';
import { CLIParams } from '../CLIParams';
import {
  BitRateNotValidException,
  StartJacktripFailedException,
} from '../exceptions';
import { validateBitRate } from '../validators';
import { RequestTimedOutException } from '../exceptions/RequestTimedOutException';
import {
  JACKTRIP_DEFAULT_CLIENT_NAME,
  JACKTRIP_DEFAULT_VERSION,
} from '../consts';

/**
 * Start a JackTrip Client
 * @param param0 JackTripClientParams
 * @returns RunningCommand
 */
export const startJacktripClient = (
  {
    clientName = JACKTRIP_DEFAULT_CLIENT_NAME,
    hub = true,
    host = 'localhost',
    channels = 2,
    debug = false,
    queueBuffer = 4,
    bitRate = BitRate.Sixteen,
    redundancy = 1,
    sendChannels = 2,
    receiveChannels = 2,
    realtimePriority = true,
  }: JacktripClientParams,
  { onLog, softwareVersion = JACKTRIP_DEFAULT_VERSION }: OptionalParams
): RunningCommand => {
  // Do some validation
  if (!validateBitRate(bitRate)) throw new BitRateNotValidException();

  // Get some information to work with
  const jacktripPaths = getJacktripPaths({
    jacktripVersion: softwareVersion,
  });
  const cliParams = new CLIParams();

  // Hub mode or not?
  cliParams.addParam({
    flag: hub ? '-C' : '-c',
    value: host,
  });

  // Define the amount of channels (defaults 2)
  cliParams.addParam({
    flag: '-n',
    value: channels.toString(),
  });

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

  // Sets the client name
  cliParams.addParam({
    flag: '-J',
    value: clientName,
  });

  // Sets the remote name (is the clientname)
  cliParams.addParam({
    flag: '-K',
    value: clientName,
  });

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
    return { command: runningCommand.command };
  } catch (e: any) {
    throw new StartJacktripFailedException(e.message);
  }
};

/**
 * Starts a a Jacktrip Client and waits until the server is fully started.
 * @param param0 JacktripClientParams
 * @returns Promise<RunningCommand>
 */
export const startJacktripClientAsync = (
  jacktripClientParams: JacktripClientParams,
  { onLog, softwareVersion = JACKTRIP_DEFAULT_VERSION }: OptionalParams
): Promise<RunningCommand> =>
  new Promise<RunningCommand>((resolve, reject) => {
    try {
      // Init some variables
      const pollTimeout = 5000;
      const pollIntervalTime = 500;
      const maxPolls = pollTimeout / pollIntervalTime;
      let currentPoll = 0;

      // Start the Jacktrip server
      const runningCommand = startJacktripClient(jacktripClientParams, {
        onLog,
        softwareVersion,
      });

      // Start polling and check if Daemon is running via Jack LSP
      const pollInterval = setInterval(async () => {
        currentPoll += 1;
        // If max polls are reached, clear the interval and reject the promise
        if (currentPoll > maxPolls) {
          clearInterval(pollInterval);
          reject(
            new RequestTimedOutException(
              'Request Timed Out. Could not start the Jacktrip client.'
            )
          );
        }

        // Are we running?
        isJacktripRunning().then((isRunning) => {
          // If so, resolve the promise and clear interval
          if (isRunning) {
            clearInterval(pollInterval);
            resolve(runningCommand);
          }
        });
      }, pollIntervalTime);
    } catch (e) {
      reject(e);
    }
  });
