# Zwerm3 Jack

This library will be used as a backend to run Jack and Jacktrip processes in the Zwerm3 environment.

## API

### `connectChannel(source: string, destination: string)`
This will make connection between a sender and a receiver.

### `disconnectChannel(source: string, destination: string`
This will disconnect a sender and a receiver.

### `getJackPaths()`
This will get all the paths related to Jack. This function will check the OS (Windows, macOS or Linux) to generate the paths.

### `getJacktripPaths()`
This will get all the paths related to Jacktrip. This function will get the Jacktrip binary used in this package.

### `getJackSystemClients()`
Get the system clients of Jack.

### `isJackDmpRunning()`
This will return a boolean whether Jack is running or not.

### `isJacktripRunning()`
This will return a boolean whether Jacktrip is running or not.

### `getJackHubClients()`
This will return all the hub clients (e.g. the connected clients if Jacktrip is running in hub mode)

### `killAllProcesses()`
Kills all the Jack and Jacktrip processes.

### `killJacktrip()`
Kills the Jacktrip proces.

### `killJack()`
Kills the Jack proces.

### `startJackDmp(jackParams, optionalParams)`
Start a Jack instance on the host.

**jackParams**
- `device: string`: The device to use, defaults the one selected in the OS
- `channels: number`: The amount of channels to use
- `sampleRate: number`: The sample rate
- `bufferSize: number`: The buffer size

**optionalParams**
- `onLog: (message: string) => void`

### `startJackDmpAsync(jackParams, optionalParams)`
Starts a Jack instance on the host. This returns a promise, so waiting until the Jack instance started is possible.

### `startJacktripServer(jacktripServerParams)`
Start a Jacktrip instance as a server on the host.

**jacktripParams**
- `hub: boolean`
- `hubPatchMode: HubPatchMode`
- `channels: number`
- `queueBuffer: number`
- `debug: boolean`
- `bitRate: BitRate`
- `redundancy: number`

### `startJacktripServerAsync(jacktripServerParams)`
Start a Jacktrip instance as a server on the host. This returns a promise, so waiting until the Jacktrip instance started is possible.

### `startJacktripHubClient()`
Start a Jacktrip instance as a client on the HUB server.

### `startJacktripHubClientAsync()`
Start a Jacktrip instance as a client on the HUB server. This returns a promise, so waiting until the Jacktrip instance started is possible.

### `startJacktripHubServer()`
Start a Jacktrip HUB server instance.

### `startJacktripHubClientAsync()`
Start a Jacktrip HUB server instance. This returns a promise, so waiting until the Jacktrip instance started is possible.

### `startJacktripP2PClient()`
Start a Jacktrip Peer 2 Peer client.

### `startJacktripP2PClientAsync()`
Start a Jacktrip Peer 2 Peer client asynchronously.

### `startJacktripP2PServer()`
Start a Jacktrip Peer 2 Peer server.

### `startJacktripP2PServerAsync()`
Start a Jacktrip Peer 2 Peer server asynchronously.

## Authors

- [Tim De Paepe](mailto:tim.depaepe@gmail.com)
- Kasper Jordaens