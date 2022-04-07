/**
 * This will export all the needed bin paths to use Jack & Jacktrip commands
 */

import { JackPaths } from '../interfaces';
import {
  JACK_BASE_PATH_WIN,
  JACK_BASE_PATH_DARWIN,
  JACK_BASE_PATH_LINUX,
} from '../consts';

/**
 * This will return the Windows Paths for the Jack instance
 * @returns The Windows JackPaths
 */
const jackWinPaths = (): JackPaths => ({
  jackConnect: `${JACK_BASE_PATH_WIN}jack_connect.exe`,
  jackDisconnect: `${JACK_BASE_PATH_WIN}jack_disconnect.exe`,
  jackDmp: `${JACK_BASE_PATH_WIN}jackd.exe`,
  jackLsp: `${JACK_BASE_PATH_WIN}jack_lsp.exe`,
});

/**
 * This will return the Darwin Paths for the Jack instance (OSX)
 * @returns The OSX JackPaths
 */
const jackDarwinPaths = (): JackPaths => ({
  jackConnect: `${JACK_BASE_PATH_DARWIN}/jack_connect`,
  jackDisconnect: `${JACK_BASE_PATH_DARWIN}/jack_disconnect`,
  jackDmp: `${JACK_BASE_PATH_DARWIN}/jackd`,
  jackLsp: `${JACK_BASE_PATH_DARWIN}/jack_lsp`,
});

/**
 * This will return the Linux Paths for the Jack instance (Linux)
 * @returns The Linux JackPaths
 */
const jackLinuxPaths = (): JackPaths => ({
  jackConnect: `${JACK_BASE_PATH_LINUX}/jack_connect`,
  jackDisconnect: `${JACK_BASE_PATH_LINUX}/jack_connect`,
  jackDmp: `${JACK_BASE_PATH_LINUX}/jackd`,
  jackLsp: `${JACK_BASE_PATH_LINUX}/jack_lsp`,
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
