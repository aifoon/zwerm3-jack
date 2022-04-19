/**
 * Interfaces for our library
 */

import { BitRate, HubPatchMode } from './enums';

export interface JackPaths {
  jackConnect: string;
  jackDisconnect: string;
  jackDmp: string;
  jackLsp: string;
}

export interface JacktripPaths {
  jackTrip: string;
}

export interface JackPathsOptions {
  jackVersion: string;
}

export interface JacktripPathsOptions {
  jacktripVersion: string;
}

export interface JacktripParams {
  channels?: number;
  debug?: boolean;
  hub?: boolean;
  queueBuffer?: number;
  realtimePriority?: boolean;
}

export interface JacktripServerParams extends JacktripParams {
  hubPatchMode?: HubPatchMode;
}

export interface JacktripClientParams extends JacktripParams {
  bitRate?: BitRate;
  clientName?: string;
  host?: string;
  receiveChannels?: number;
  redundancy?: number;
  sendChannels?: number;
}

export interface JackParams {
  device?: string;
  channels?: number;
  sampleRate?: number;
  bufferSize?: number;
  periods?: number;
}

export interface RunningCommand {
  command: string;
}

export interface HubClients {
  sendChannels: string[];
  receiveChannels: string[];
}

export interface ChannelConnection {
  source: string;
  destination: string;
}

export interface Config {
  unit: number;
}

export interface OptionalParams {
  // eslint-disable-next-line no-unused-vars
  onLog?: (message: string) => void;
  softwareVersion?: string;
}
