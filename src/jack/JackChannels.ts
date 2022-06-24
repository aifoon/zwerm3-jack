import { execSync } from 'child_process';
import { ChannelConnection } from '../interfaces';
import { getJackPaths } from './JackPaths';

/**
 * Connect a source and destination channel in Jack
 *
 * @param param0 ChannelConnection
 * @returns A message about what is done
 */
export const connectChannel = ({
  source,
  destination,
}: ChannelConnection): string => {
  const jackPaths = getJackPaths();
  execSync(`${jackPaths.jackConnect} ${source} ${destination}`);
  return `** Connecting '${source}' to '${destination}'.`;
};

/**
 * Disconnect a source and destination channel in Jack
 *
 * @param param0 ChannelConnection
 * @returns A message about what is done
 */
export const disconnectChannel = ({
  source,
  destination,
}: ChannelConnection): string => {
  const jackPaths = getJackPaths();
  execSync(`${jackPaths.jackDisconnect} ${source} ${destination}`);
  return `** Disconnecting '${source}' from '${destination}'.`;
};
