## Jack Audio Connection Manager 🔌 

### Table of Contents 
* [Jack Audio Connection Manager 🔌](#jack-audio-connection-manager-)
* [Table of Contents](#table-of-contents)
* [Overview](#overview)
* [Functions](#functions)
    * [getConnections()](#getconnections)
    * [hasConnection()](#hasconnection)
    * [connectChannel()](#connectchannel)
    * [disconnectChannel()](#disconnectchannel)

### Overview

This module provides functions for managing connections between audio channels in Jack. It relies on the `jackd` daemon and its command-line utilities to retrieve and manipulate connections.

### Functions

#### getConnections()

```typescript
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
  const output = result.stdout.toString().split('\\n');

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
```

This function retrieves all current connections in Jack by using the `jack_lsp` command-line utility. It parses the output and returns an array of objects, each representing a connection with its source and destination channels.

#### hasConnection()

```typescript
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
```

This function checks if a specific connection exists between a source and destination channel. It retrieves all current connections using `getConnections()`, finds the source channel, and then verifies if the destination channel is included in the source's destinations.

#### connectChannel()

```typescript
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
      }, 500);
    } else {
      resolve(true);
    }
  });
```

This function connects a source and destination channel in Jack using the `jack_connect` command-line utility. It repeatedly checks if the connection has been established after each attempt.  If the connection is not successful after five attempts, it returns `false`.

#### disconnectChannel()

```typescript
/**
 * Disconnect a source and destination channel in Jack
 *
 * @param param0 ChannelConnection
 * @returns A message about what is done
 */
export const disconnectChannel = (
  { source, destination }: ChannelConnection,
  currentTry = 0
): Promise<boolean> =>
  new Promise((resolve) => {
    const jackPaths = getJackPaths();
    spawnSync(jackPaths.jackDisconnect, [source, destination]);
    if (currentTry >= 5) resolve(false);
    if (hasConnection({ source, destination })) {
      setTimeout(async () => {
        if (hasConnection({ source, destination }))\n          await disconnectChannel({ source, destination }, currentTry + 1);
      }, 500);
    } else {
      resolve(true);
    }
  });
```

This function disconnects a source and destination channel in Jack using the `jack_disconnect` command-line utility. Similar to `connectChannel()`, it repeatedly checks if the disconnection has been successful after each attempt.  If the disconnection is not successful after five attempts, it returns `false`. 
