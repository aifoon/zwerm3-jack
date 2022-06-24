import { spawnSync } from 'child_process';
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
  try {
    const jackPaths = getJackPaths();
    spawnSync(jackPaths.jackConnect, [source, destination]);
    // Left this for testing purpose...
    // const p = spawnSync(jackPaths.jackConnect, [source, destination]);
    // console.log(p.stderr.toString());
    return `** Connecting '${source}' to '${destination}'.`;
  } catch (e: any) {
    return `** Connecting '${source}' to '${destination}'.`;
  }
};

/**
 * Disconnect a source and destination channel in Jack
 *
 * @param param0 ChannelConnection
 * @returns A message about what is done
 */
export const disconnectChannel = async ({
  source,
  destination,
}: ChannelConnection) => {
  try {
    const jackPaths = getJackPaths();
    spawnSync(jackPaths.jackDisconnect, [source, destination]);
    // Left this for testing purpose...
    // const p = spawnSync(jackPaths.jackDisconnect, [source, destination]);
    // console.log(source, ': ', p.stderr.toString());
    return `** Disconnecting '${source}' from '${destination}'.`;
  } catch (e: any) {
    return `** Disconnecting '${source}' to '${destination}'.`;
  }
};
