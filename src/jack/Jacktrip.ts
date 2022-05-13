/**
 * This contains all the fun stuff for JackTrip
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
import find from 'find-process';

/**
 * Gets a boolean value if the Jack Daemon is running or not
 * @returns boolean
 */
export const isJacktripRunning = (): Promise<boolean> =>
  new Promise<boolean>((resolve, reject) => {
    try {
      find('name', 'jacktrip', false).then((list: any) => {
        resolve(list.length > 0);
      });
    } catch (e: any) {
      reject(e.message);
    }
  });
