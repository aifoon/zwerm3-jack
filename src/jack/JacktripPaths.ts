/**
 * This will export all the needed bin paths to use Jack & Jacktrip commands
 */

import * as path from 'path';
import * as os from 'os';
import * as semver from 'semver';
import { JACKTRIP_BIN_PATH, JACKTRIP_DEFAULT_VERSION } from '../consts';
import { JacktripPaths, JacktripPathsOptions } from '../interfaces';

/**
 * This will return the Windows Paths for the Jacktrip instance
 * @returns The Windows JackPaths
 */
const jacktripWinPaths = ({
  jacktripVersion = JACKTRIP_DEFAULT_VERSION,
}: JacktripPathsOptions): JacktripPaths => ({
  jackTrip: path.join(
    JACKTRIP_BIN_PATH,
    jacktripVersion,
    'win32',
    'jacktrip.exe'
  ),
});

/**
 * This will return the Darwin Paths for the Jacktrip instance (OSX)
 * @returns The OSX JacktripPaths
 */
const jacktripDarwinPaths = ({
  jacktripVersion = JACKTRIP_DEFAULT_VERSION,
}: JacktripPathsOptions): JacktripPaths => ({
  jackTrip: path.join(
    JACKTRIP_BIN_PATH,
    `/${jacktripVersion}/darwin/${
      semver.gte(os.release(), '15.0.0') ? 'jacktrip' : 'jacktrip_1.1'
    }`
  ),
});

/**
 * This will return the Linux Paths for the Jacktrip instance (Linux)
 * @returns The Linux JacktripPaths
 */
const jacktripLinuxPaths = ({
  jacktripVersion = JACKTRIP_DEFAULT_VERSION,
}: JacktripPathsOptions): JacktripPaths => ({
  jackTrip: path.join(
    JACKTRIP_BIN_PATH,
    jacktripVersion,
    'linux',
    process.arch === 'arm' ? 'arm' : 'x64',
    'jacktrip'
  ),
});

/**
 * Based on the OS you use this function, you will get the JacktripPaths
 * @returns The OS bases Jacktrip paths
 */
export const getJacktripPaths = (
  jackPathsOptions: JacktripPathsOptions = {
    jacktripVersion: JACKTRIP_DEFAULT_VERSION,
  }
): JacktripPaths => {
  switch (process.platform) {
    case 'win32':
      return jacktripWinPaths(jackPathsOptions);
    case 'darwin':
      return jacktripDarwinPaths(jackPathsOptions);
    default:
      return jacktripLinuxPaths(jackPathsOptions);
  }
};
