/**
 * This contains all the fun stuff to start a Jacktrip server
 */

import { spawn } from 'child_process';
import { HubPatchMode, StartJacktripType } from '../enums';
import {
  JacktripHubServerParams,
  RunningCommand,
  OptionalParams,
} from '../interfaces';
import { getJacktripPaths } from './JacktripPaths';
import { startJacktripAsync } from './JacktripAsync';
import { CLIParams } from '../CLIParams';
import {
  HubPatchModeNotValidException,
  StartJacktripFailedException,
} from '../exceptions';
import { validateHubPatchMode } from '../validators';

/**
 * Starting the Jacktrip Hub Server
 * @param param0 JacktripHubServerParams
 * @returns RunningCommand
 */
export const startJacktripHubServer = (
  jacktripHubServerParams: JacktripHubServerParams,
  { onLog }: OptionalParams
): RunningCommand => {
  // Destructure the variables
  const {
    hubPatchMode = HubPatchMode.NoConnections,
    channels = 2,
    queueBuffer = 4,
    debug = false,
    realtimePriority = true,
    localPort = 4464,
    connectDefaultAudioPorts = true,
  } = jacktripHubServerParams;

  // Do some validate
  if (!validateHubPatchMode(hubPatchMode))
    throw new HubPatchModeNotValidException();

  // Get some inforamtion to work with
  const jacktripPaths = getJacktripPaths();
  const cliParams = new CLIParams();

  // Set to Hub server mode
  cliParams.addParam({ flag: '-S' });

  // Define the hubPatchMode
  // more info: https://ccrma.stanford.edu/docs/common/IETF.html#hub-patching
  cliParams.addParam({
    flag: '-p',
    value: hubPatchMode.toString(),
  });

  // Define the amount of channels (defaults 2)
  if (channels !== -1) {
    cliParams.addParam({
      flag: '-n',
      value: channels.toString(),
    });
  }

  // Number of packets of input queue (defaults 4)
  cliParams.addParam({
    flag: '-q',
    value: queueBuffer.toString(),
  });

  // Set the local port
  cliParams.addParam({
    flag: '-B',
    value: localPort.toString(),
  });

  // Wavetable repeat last packet instead of muting with zeroes if network packet droput happens
  cliParams.addParam({
    flag: '-z',
  });

  // If we don't want to connect the default audio ports
  if (!connectDefaultAudioPorts) {
    cliParams.addParam({
      flag: '-D',
    });
  }

  // Sets debug mode
  if (debug) {
    cliParams.addParam({
      flag: '-V',
    });
  }

  // Enable realtime priority for networking threads
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
      params: jacktripHubServerParams,
    };
  } catch (e: any) {
    throw new StartJacktripFailedException(e.message);
  }
};

/**
 * Starts a a Jacktrip Hub Server and waits until the server is fully started.
 * @param param0 JackParams channels, bufferSize & sampleRate
 * @returns Promise<RunningCommand>
 */
export const startJacktripHubServerAsync = (
  jacktripHubServerParams: JacktripHubServerParams,
  optionalParams: OptionalParams
): Promise<RunningCommand> =>
  startJacktripAsync(
    jacktripHubServerParams,
    StartJacktripType.HubServer,
    optionalParams
  );
