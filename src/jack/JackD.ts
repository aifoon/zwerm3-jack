/**
 * Logic to manage the Jack Daemon
 */

import { spawn, spawnSync } from 'child_process';
import { JackParams, RunningCommand, OptionalParams } from '../interfaces';
import { CLIParams } from '../CLIParams';
import {
  BufferSizeNotValidException,
  SampleRateNotValidException,
} from '../exceptions';
import { getJackPaths } from './JackPaths';
import { validateBufferSize, validateSampleRate } from '../validators';
import { StartJackDmpFailedException } from '../exceptions/StartJackDmpFailedException';
import { RequestTimedOutException } from '../exceptions/RequestTimedOutException';

/**
 * Returns the device parameters for jack to start, OS specific
 *
 * @returns CLIParams
 */
const getDeviceParams = (): CLIParams => {
  const cliParams = new CLIParams();

  // win32 support
  if (process.platform === 'win32') {
    cliParams.addParam({ flag: '-d', value: 'portaudio' });
    cliParams.addParam({ flag: '-d', value: 'ASIO::ASIO4ALL v2' });
  }

  // macos support
  else if (process.platform === 'darwin') {
    cliParams.addParam({ flag: '-d', value: 'coreaudio' });
  }

  // other (alsa)
  else {
    cliParams.addParam({ flag: '-d', value: 'alsa' });
  }

  return cliParams;
};

/**
 * Gets a boolean value if the Jack Daemon is running or not
 * @returns boolean
 */
export const isJackDmpRunning = (): boolean => {
  try {
    // Get some information to work with
    const jackPaths = getJackPaths();

    // jack_lsp will return an error if jack server isn't running
    const proc = spawnSync(jackPaths.jackLsp);
    return proc.status === 0;
  } catch (e) {
    // logger.error(e.message);
    return false;
  }
};

/**
 * Starts a Jack Daemon on the host
 * @param param0 JackParams channels, bufferSize & sampleRate
 * @returns RunningCommand
 */
export const startJackDmp = (
  {
    device = '',
    channels = 2,
    bufferSize = 256,
    sampleRate = 48000,
  }: JackParams,
  { onLog }: OptionalParams
): RunningCommand => {
  // Do some validation
  if (!validateBufferSize(bufferSize)) throw new BufferSizeNotValidException();
  if (!validateSampleRate(sampleRate)) throw new SampleRateNotValidException();

  // Get some information to work with
  const jackPaths = getJackPaths();
  const cliParams = getDeviceParams();

  // Add the soundcard device (if given, defaults the default soundcard driver)
  if (device) cliParams.addParam({ flag: '-d', value: device.toString() });

  // Add the output channels
  cliParams.addParam({ flag: '-o', value: channels.toString() });

  // Add the buffersize
  cliParams.addParam({ flag: '-p', value: bufferSize.toString() });

  // Add the samplerate
  cliParams.addParam({ flag: '-r', value: sampleRate.toString() });

  try {
    // Create the command
    const command = `** ${jackPaths.jackDmp} ${cliParams.toString()}`;

    // Let them know which command we are running
    if (onLog) onLog(`Running Command: ${command}`);

    // Return the running command
    const runningCommand = {
      command,
      process: spawn(jackPaths.jackDmp, cliParams.toStringArray()),
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
    throw new StartJackDmpFailedException(e.message);
  }
};

/**
 * Starts a Jack Daemon on the host and waits until the Jack Daemon is fully started.
 * @param param0 JackParams channels, bufferSize & sampleRate
 * @returns Promise<RunningCommand>
 */
export const startJackDmpAsync = (
  jackParams: JackParams,
  optionalParams: OptionalParams
): Promise<RunningCommand> =>
  new Promise<RunningCommand>((resolve, reject) => {
    try {
      // Init some variables
      const pollTimeout = 5000;
      const pollIntervalTime = 500;
      const maxPolls = pollTimeout / pollIntervalTime;
      let currentPoll = 0;

      // Start the Jack Daemon
      const runningCommand = startJackDmp(jackParams, optionalParams);

      // Start polling and check if Daemon is running via Jack LSP
      const pollInterval = setInterval(() => {
        currentPoll += 1;

        // If max polls are reached, clear the interval and reject the promise
        if (currentPoll > maxPolls) {
          clearInterval(pollInterval);
          reject(
            new RequestTimedOutException(
              'Request Timed Out. Could not start the Jack Daemon.'
            )
          );
        }

        // Are we running?
        const isRunning = isJackDmpRunning();

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