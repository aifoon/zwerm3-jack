/**
 * This will export all the needed bin paths to use Jack & Jacktrip commands
 */

import { JackPaths } from '../interfaces';
import {
  JACK_BASE_PATH_WIN,
  JACK_BASE_PATH_DARWIN,
  JACK_BASE_PATH_LINUX,
} from '../consts';
import Zwerm3Jack from '../Zwerm3Jack';

/**
 * Gets the jack folder path (cached or from static constants)
 * @returns a string value that represents the jack folder path
 */
const getJackFolderPath = (): string => {
  if (Zwerm3Jack.hasCustomJackFolderPath) return Zwerm3Jack.jackFolderPath;

  switch (process.platform) {
    case 'win32':
      return JACK_BASE_PATH_WIN;
    case 'darwin':
      return JACK_BASE_PATH_DARWIN;
    default:
      return JACK_BASE_PATH_LINUX;
  }
};

/**
 * This will return the Windows Paths for the Jack instance
 * @returns The Windows JackPaths
 */
const jackWinPaths = (): JackPaths => ({
  jackConnect: `${getJackFolderPath()}jack_connect.exe`,
  jackDisconnect: `${getJackFolderPath()}jack_disconnect.exe`,
  jackDmp: `${getJackFolderPath()}jackd.exe`,
  jackLsp: `${getJackFolderPath()}jack_lsp.exe`,
});

/**
 * This will return the Darwin Paths for the Jack instance (OSX)
 * @returns The OSX JackPaths
 */
const jackDarwinPaths = (): JackPaths => ({
  jackConnect: `${getJackFolderPath()}/jack_connect`,
  jackDisconnect: `${getJackFolderPath()}/jack_disconnect`,
  jackDmp: `${getJackFolderPath()}/jackd`,
  jackLsp: `${getJackFolderPath()}/jack_lsp`,
});

/**
 * This will return the Linux Paths for the Jack instance (Linux)
 * @returns The Linux JackPaths
 */
const jackLinuxPaths = (): JackPaths => ({
  jackConnect: `${getJackFolderPath()}/jack_connect`,
  jackDisconnect: `${getJackFolderPath()}/jack_connect`,
  jackDmp: `${getJackFolderPath()}/jackd`,
  jackLsp: `${getJackFolderPath()}/jack_lsp`,
});

/**
 * Based on the OS you use this function, you will get the JackPaths
 * @returns The OS bases Jack paths
 */
export const getJackPaths = (): JackPaths => {
  switch (process.platform) {
    case 'win32':
      return jackWinPaths();
    case 'darwin':
      return jackDarwinPaths();
    default:
      return jackLinuxPaths();
  }
};
