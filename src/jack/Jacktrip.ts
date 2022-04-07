/**
 * This contains all the fun stuff for JackTrip
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as ps from 'ps-node';
import { JACKTRIP_DEFAULT_VERSION } from '../consts';
import { getJacktripPaths } from './JacktripPaths';
import { JacktripPathsOptions } from '../interfaces';

/**
 * Gets a boolean value if the Jack Daemon is running or not
 * @returns boolean
 */
export const isJacktripRunning = (
  jackPathsOptions: JacktripPathsOptions = {
    jacktripVersion: JACKTRIP_DEFAULT_VERSION,
  }
): Promise<boolean> =>
  new Promise<boolean>((resolve, reject) => {
    try {
      // Get some information to work with
      const jackPaths = getJacktripPaths(jackPathsOptions);

      // Search for running processes
      ps.lookup(
        { command: jackPaths.jackTrip },
        (err: Error, resultList: ps.Program[]) => {
          if (err) reject(err);
          resolve(resultList.length > 0);
        }
      );
    } catch (e: any) {
      reject(e.message);
    }
  });
