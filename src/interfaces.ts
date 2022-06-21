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

export interface JacktripParams {
  channels?: number;
  debug?: boolean;
  queueBuffer?: number;
  realtimePriority?: boolean;
  localPort?: number;
  connectDefaultAudioPorts?: boolean;
}

export interface JacktripHubServerParams extends JacktripParams {
  hubPatchMode?: HubPatchMode;
}

export interface JacktripHubClientParams extends JacktripParams {
  bitRate?: BitRate;
  clientName?: string;
  host?: string;
  receiveChannels?: number;
  redundancy?: number;
  sendChannels?: number;
  remotePort?: number;
}

export interface JacktripP2PServerParams extends JacktripParams {
  bitRate?: BitRate;
  clientName?: string;
  receiveChannels?: number;
  redundancy?: number;
  sendChannels?: number;
}

export interface JacktripP2PClientParams extends JacktripP2PServerParams {
  host?: string;
  remotePort?: number;
}

export interface JackParams {
  device?: string;
  inputChannels?: number;
  outputChannels?: number;
  sampleRate?: number;
  bufferSize?: number;
  periods?: number;
}

export interface JacktripP2PClient {
  localPort: number;
  clientName: string;
  host: string;
}

export interface RunningCommand {
  command: string;
  pid: number | undefined;
  params:
    | JacktripP2PClientParams
    | JacktripP2PServerParams
    | JacktripHubClientParams
    | JacktripHubServerParams
    | JackParams;
}

export interface HubClients {
  sendChannels: string[];
  receiveChannels: string[];
}

export interface SystemClients {
  captureChannels: string[];
  playbackChannels: string[];
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
}
