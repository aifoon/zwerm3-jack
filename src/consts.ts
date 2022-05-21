/**
 * A file with constant variables
 */

import * as path from 'path';

const JACKTRIP_DEFAULT_CLIENT_NAME = 'client';
const JACKTRIP_DEFAULT_VERSION = '1.5.3';
const JACK_DEFAULT_VERSION = '1.9.19';
const JACKTRIP_BIN_PATH = path.join(__dirname, 'resources/jacktrip/');
const JACK_BASE_PATH_WIN = 'C:\\Program Files (x86)\\Jack\\';
const JACK_BASE_PATH_DARWIN = '/usr/local/bin';
const JACK_BASE_PATH_LINUX = '/usr/bin';

// This variable is the timeout that will wait for jackd and jacktrip
// after a process has been detected (this to give time for jackd and jacktrip)
// to work properly
const TIMEOUT_AFTER_RUNNING_PROCESS = 2000;

export {
  JACKTRIP_DEFAULT_CLIENT_NAME,
  JACKTRIP_DEFAULT_VERSION,
  JACKTRIP_BIN_PATH,
  JACK_DEFAULT_VERSION,
  JACK_BASE_PATH_DARWIN,
  JACK_BASE_PATH_LINUX,
  JACK_BASE_PATH_WIN,
  TIMEOUT_AFTER_RUNNING_PROCESS,
};
