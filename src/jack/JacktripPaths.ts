/**
 * This will export all the needed bin paths to use Jack & Jacktrip commands
 */

import * as path from 'path';
import { JACKTRIP_BIN_PATH } from '../consts';
import { JacktripPaths } from '../interfaces';
import Zwerm3Jack from '../Zwerm3Jack';

/**
 * This will return the Windows Paths for the Jacktrip instance
 * @returns The Windows JackPaths
 */
const jacktripWinPaths = (): JacktripPaths => ({
  jackTrip: Zwerm3Jack.hasCustomJacktripBinPath
    ? Zwerm3Jack.jacktripBinPath
    : path.join(JACKTRIP_BIN_PATH, 'win32', 'jacktrip.exe'),
});

/**
 * This will return the Darwin Paths for the Jacktrip instance (OSX)
 * @returns The OSX JacktripPaths
 */
const jacktripDarwinPaths = (): JacktripPaths => ({
  jackTrip: Zwerm3Jack.hasCustomJacktripBinPath
    ? Zwerm3Jack.jacktripBinPath
    : path.join(JACKTRIP_BIN_PATH, 'darwin', 'jacktrip'),
});

/**
 * This will return the Linux Paths for the Jacktrip instance (Linux)
 * @returns The Linux JacktripPaths
 */
const jacktripLinuxPaths = (): JacktripPaths => ({
  jackTrip: Zwerm3Jack.hasCustomJacktripBinPath
    ? Zwerm3Jack.jacktripBinPath
    : path.join(
        JACKTRIP_BIN_PATH,
        'linux',
        process.arch === 'arm' ? 'arm' : 'x64',
        'jacktrip'
      ),
});

/**
 * Based on the OS you use this function, you will get the JacktripPaths
 * @returns The OS bases Jacktrip paths
 */
export const getJacktripPaths = (): JacktripPaths => {
  switch (process.platform) {
    case 'win32':
      return jacktripWinPaths();
    case 'darwin':
      return jacktripDarwinPaths();
    default:
      return jacktripLinuxPaths();
  }
};
