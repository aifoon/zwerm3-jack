import {
  JacktripHubServerParams,
  RunningCommand,
  OptionalParams,
  JacktripHubClientParams,
  JacktripP2PClientParams,
  JacktripP2PServerParams,
} from '../interfaces';
import { StartJacktripType } from '../enums';
import { isJacktripRunning } from './Jacktrip';
import { startJacktripHubClient } from './JacktripHubClient';
import { startJacktripHubServer } from './JacktripHubServer';
import { RequestTimedOutException } from '../exceptions';
import { TIMEOUT_AFTER_RUNNING_PROCESS } from '../consts';
import { startJacktripP2PServer } from './JacktripP2PServer';

/**
 * Starts a a Jacktrip instance and waits until the instance is fully started.
 * @returns Promise<RunningCommand>
 */
export const startJacktripAsync = (
  jacktripParams:
    | JacktripHubServerParams
    | JacktripHubClientParams
    | JacktripP2PClientParams
    | JacktripP2PServerParams,
  startJacktripType: StartJacktripType,
  optionalParams: OptionalParams
): Promise<RunningCommand> =>
  new Promise<RunningCommand>((resolve, reject) => {
    try {
      // Init some variables
      const pollTimeout = 5000;
      const pollIntervalTime = 500;
      const maxPolls = pollTimeout / pollIntervalTime;
      let currentPoll = 0;

      // Start the Jacktrip server
      let runningCommand: RunningCommand;
      switch (startJacktripType) {
        case StartJacktripType.HubServer:
          runningCommand = startJacktripHubServer(
            jacktripParams,
            optionalParams
          );
          break;
        case StartJacktripType.HubClient:
          runningCommand = startJacktripHubClient(
            jacktripParams,
            optionalParams
          );
          break;
        case StartJacktripType.P2PServer:
          runningCommand = startJacktripP2PServer(
            jacktripParams,
            optionalParams
          );
          break;
        default:
          runningCommand = startJacktripHubServer(
            jacktripParams,
            optionalParams
          );
          break;
      }

      // Start polling and check if Daemon is running
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
        isJacktripRunning().then((isRunning) => {
          // If so, resolve the promise and clear interval
          if (isRunning) {
            clearInterval(pollInterval);
            setTimeout(
              () => resolve(runningCommand),
              TIMEOUT_AFTER_RUNNING_PROCESS
            );
          }
        });
      }, pollIntervalTime);
    } catch (e) {
      reject(e);
    }
  });
