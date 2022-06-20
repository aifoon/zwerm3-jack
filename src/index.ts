/**
 * All the zwerm3 jack logic
 */

import {
  startJacktripHubServer,
  startJacktripHubServerAsync,
} from './jack/JacktripHubServer';
import {
  startJacktripHubClient,
  startJacktripHubClientAsync,
} from './jack/JacktripHubClient';
import {
  startJacktripP2PServer,
  startJacktripP2PServerAsync,
} from './jack/JacktripP2PServer';
import {
  startJacktripP2PClient,
  startJacktripP2PClientAsync,
  startJacktriptP2PMultipleClientsAsync,
} from './jack/JacktripP2PClient';
import {
  killJack,
  killJacktrip,
  killAllProcesses,
  killProcessByPid,
  getRunningProcesses,
} from './jack/Kill';
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
import * as Zwerm3JackTypes from './interfaces';
import * as Zwerm3JackEnums from './enums';

export {
  connectChannel,
  disconnectChannel,
  getJackPaths,
  getJacktripPaths,
  isJackDmpRunning,
  isJacktripRunning,
  getJackHubClients,
  getRunningProcesses,
  killAllProcesses,
  killJacktrip,
  killJack,
  killProcessByPid,
  startJackDmp,
  startJackDmpAsync,
  startJacktripHubServer,
  startJacktripHubServerAsync,
  startJacktripHubClient,
  startJacktripHubClientAsync,
  startJacktripP2PServer,
  startJacktripP2PServerAsync,
  startJacktripP2PClient,
  startJacktripP2PClientAsync,
  startJacktriptP2PMultipleClientsAsync,
  Zwerm3JackTypes,
  Zwerm3JackEnums,
};
