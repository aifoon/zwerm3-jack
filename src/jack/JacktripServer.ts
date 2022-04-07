/**
 * This contains all the fun stuff to start a Jacktrip server
 */

import { spawn } from 'child_process';
import { BitRate, HubPatchMode } from '../enums';
import {
  JacktripServerParams,
  RunningCommand,
  OptionalParams,
} from '../interfaces';
import { getJacktripPaths } from './JacktripPaths';
import { isJacktripRunning } from './Jacktrip';
import { CLIParams } from '../CLIParams';
import {
  HubPatchModeNotValidException,
  StartJacktripFailedException,
  RequestTimedOutException,
} from '../exceptions';
import { validateHubPatchMode } from '../validators';
import { JACKTRIP_DEFAULT_VERSION } from '../consts';

/**
 * Starting the Jacktrip Server
 * @param param0 JacktripServerParams
 * @returns RunningCommand
 */
export const startJacktripServer = (
  {
    hub = true,
    hubPatchMode = HubPatchMode.NoConnections,
    channels = 2,
    queueBuffer = 4,
    debug = false,
    bitRate = BitRate.Sixteen,
    redundancy = 1,
  }: JacktripServerParams,
  { onLog, softwareVersion = JACKTRIP_DEFAULT_VERSION }: OptionalParams
): RunningCommand => {
  // Do some validate
  if (!validateHubPatchMode(hubPatchMode))
    throw new HubPatchModeNotValidException();

  // Get some inforamtion to work with
  const jacktripPaths = getJacktripPaths({ jacktripVersion: softwareVersion });
  const cliParams = new CLIParams();

  // Hub mode or not?
  cliParams.addParam({ flag: hub ? '-S' : 's' });

  // Define the hubPatchMode
  // more info: https://ccrma.stanford.edu/docs/common/IETF.html#hub-patching
  cliParams.addParam({
    flag: '-p',
    value: hubPatchMode.toString(),
  });

  // Define the amount of channels (defaults 2)
  cliParams.addParam({
    flag: '-n',
    value: channels.toString(),
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

  // Wavetable repeat last packet instead of muting with zeroes if network packet droput happens
  cliParams.addParam({
    flag: '-z',
  });

  // Packet Redundancy to avoid glitches with packet losses (defaults 1)
  cliParams.addParam({
    flag: '-r',
    value: redundancy.toString(),
  });

  // Sets debug mode
  if (debug) {
    cliParams.addParam({
      flag: '-V',
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
 * Starts a a Jacktrip Server and waits until the server is fully started.
 * @param param0 JackParams channels, bufferSize & sampleRate
 * @returns Promise<RunningCommand>
 */
export const startJacktripServerAsync = (
  jacktripServerParams: JacktripServerParams,
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
      const runningCommand = startJacktripServer(jacktripServerParams, {
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
              'Request Timed Out. Could not start the Jacktrip server.'
            )
          );
        }

        // Are we running?
        const isRunning = await isJacktripRunning({
          jacktripVersion: softwareVersion,
        });

        // If so, resolve the promise and clear interval
        if (isRunning) {
          clearInterval(pollInterval);
          resolve(runningCommand);
        }
      }, pollIntervalTime);
    } catch (e) {
      reject(e);
    }
  });
