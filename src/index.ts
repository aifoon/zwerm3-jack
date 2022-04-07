/**
 * All the zwerm3 jack logic
 */

import {
  startJacktripServer,
  startJacktripServerAsync,
} from './jack/JacktripServer';
import {
  startJacktripClient,
  startJacktripClientAsync,
} from './jack/JacktripClient';
import { killJack, killJacktrip, killAllProcesses } from './jack/Kill';
import { getJackPaths } from './jack/JackPaths';
import { getJacktripPaths } from './jack/JacktripPaths';
import {
  startJackDmp,
  startJackDmpAsync,
  isJackDmpRunning,
} from './jack/JackD';
import { isJacktripRunning } from './jack/Jacktrip';
import { getJackHubClients } from './jack/JackHubClients';
import { connectChannel, disconnectChannel } from './jack/JackChannels';

export {
  connectChannel,
  disconnectChannel,
  getJackPaths,
  getJacktripPaths,
  isJackDmpRunning,
  isJacktripRunning,
  getJackHubClients,
  killAllProcesses,
  killJacktrip,
  killJack,
  startJackDmp,
  startJackDmpAsync,
  startJacktripServer,
  startJacktripServerAsync,
  startJacktripClient,
  startJacktripClientAsync,
};
