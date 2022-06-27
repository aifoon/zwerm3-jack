import { spawnSync } from 'child_process';
import { ChannelConnection } from '../interfaces';
import { getJackPaths } from './JackPaths';

/**
 * Get all current connection
 * @returns
 */
const getConnections = (): {
  source: string;
  destinations: string[];
}[] => {
  // Get some information to work with
  const jackPaths = getJackPaths();

  // Get the connections
  const result = spawnSync(jackPaths.jackLsp, ['-c']);
  const output = result.stdout.toString().split('\n');

  // Get all connections
  const connections: { source: string; destinations: string[] }[] = [];
  for (let i = 0; i < output.length - 1; i += 1) {
    const source = output[i].trim();
    const destinations = [];
    let y = 1;
    while (output[i + y].startsWith(' ')) {
      destinations.push(output[i + y].trim());
      y += 1;
    }
    i += y - 1;
    connections.push({ source, destinations });
  }

  return connections;
};

/**
 * Check if we have a certain connection
 * @param source
 * @param destination
 * @returns
 */
export const hasConnection = ({ source, destination }: ChannelConnection) => {
  // get all the connections
  const connections = getConnections();

  // find source
  const connection = connections.find(
    ({ source: currentSource }) => source === currentSource
  );

  // check if destination exists
  return connection?.destinations.includes(destination);
};

/**
 * Connect a source and destination channel in Jack
 *
 * @param param0 ChannelConnection
 * @returns A message about what is done
 */
export const connectChannel = async (
  { source, destination }: ChannelConnection,
  currentTry = 0
): Promise<boolean> =>
  new Promise((resolve) => {
    const jackPaths = getJackPaths();
    spawnSync(jackPaths.jackConnect, [source, destination]);
    if (currentTry >= 5) resolve(false);
    if (!hasConnection({ source, destination })) {
      setTimeout(async () => {
        if (!hasConnection({ source, destination })) {
          await connectChannel({ source, destination }, currentTry + 1);
        }
      }, 5000);
    } else {
      resolve(true);
    }
  });

/**
 * Disconnect a source and destination channel in Jack
 *
 * @param param0 ChannelConnection
 * @returns A message about what is done
 */
export const disconnectChannel = ({
  source,
  destination,
}: ChannelConnection): Promise<string> =>
  new Promise((resolve) => {
    const jackPaths = getJackPaths();
    spawnSync(jackPaths.jackDisconnect, [source, destination]);
    setTimeout(async () => {
      if (hasConnection({ source, destination }))
        await disconnectChannel({ source, destination });
      resolve(`** Disconnected ${source} from ${destination}.`);
    }, 500);
  });
