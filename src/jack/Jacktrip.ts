/**
 * This contains all the fun stuff for JackTrip
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as ps from 'ps-node';

/**
 * Gets a boolean value if the Jack Daemon is running or not
 * @returns boolean
 */
export const isJacktripRunning = (): Promise<boolean> =>
  new Promise<boolean>((resolve, reject) => {
    try {
      // Search for running processes
      ps.lookup(
        { command: 'jacktrip' },
        (err: Error, resultList: ps.Program[]) => {
          if (err) reject(err);
          resolve(resultList.length > 0);
        }
      );
    } catch (e: any) {
      reject(e.message);
    }
  });
