## Jacktrip Interfaces

This document provides an internal code documentation for the interfaces defined in the `interfaces.ts` file.

### Table of Contents

* [JackPaths](#jackpaths)
* [JacktripPaths](#jacktrippaths)
* [JackPathsOptions](#jackpathsoptions)
* [JacktripParams](#jacktripparams)
* [JacktripHubServerParams](#jacktriphubserverparams)
* [JacktripHubClientParams](#jacktriphubclientparams)
* [JacktripP2PServerParams](#jacktripp2pserverparams)
* [JacktripP2PClientParams](#jacktripp2pclientparams)
* [JackParams](#jackparams)
* [JacktripP2PClient](#jacktripp2pclient)
* [RunningCommand](#runningcommand)
* [HubClients](#hubclients)
* [SystemClients](#systemclients)
* [ChannelConnection](#channelconnection)
* [Config](#config)
* [OptionalParams](#optionalparams)

---

### JackPaths

This interface defines the paths for the Jack audio server.

| Property | Type | Description |
|---|---|---|
| `jackConnect` | string | Path to the `jack_connect` command. |
| `jackDisconnect` | string | Path to the `jack_disconnect` command. |
| `jackDmp` | string | Path to the `jack_dmp` command. |
| `jackLsp` | string | Path to the `jack_lsp` command. |

**Example Usage:**

```typescript
const jackPaths: JackPaths = {
  jackConnect: '/usr/bin/jack_connect',
  jackDisconnect: '/usr/bin/jack_disconnect',
  jackDmp: '/usr/bin/jack_dmp',
  jackLsp: '/usr/bin/jack_lsp',
};
```

### JacktripPaths

This interface defines the paths for the Jacktrip audio server.

| Property | Type | Description |
|---|---|---|
| `jackTrip` | string | Path to the `jacktrip` command. |

**Example Usage:**

```typescript
const jacktripPaths: JacktripPaths = {
  jackTrip: '/usr/bin/jacktrip',
};
```

### JackPathsOptions

This interface defines the options for the Jack audio server.

| Property | Type | Description |
|---|---|---|
| `jackVersion` | string | Version of the Jack audio server. |

**Example Usage:**

```typescript
const jackPathsOptions: JackPathsOptions = {
  jackVersion: '1.9.12',
};
```

### JacktripParams

This interface defines the parameters for the Jacktrip audio server.

| Property | Type | Description |
|---|---|---|
| `channels` | number | Number of channels to use. |
| `debug` | boolean | Enable debug mode. |
| `queueBuffer` | number | Size of the queue buffer in milliseconds. |
| `realtimePriority` | boolean | Set the process to real-time priority. |
| `localPort` | number | Local port to listen on. |
| `connectDefaultAudioPorts` | boolean | Connect to the default audio ports. |

**Example Usage:**

```typescript
const jacktripParams: JacktripParams = {
  channels: 2,
  debug: false,
  queueBuffer: 100,
  realtimePriority: true,
  localPort: 4444,
  connectDefaultAudioPorts: true,
};
```

### JacktripHubServerParams

This interface extends the `JacktripParams` interface and defines the parameters for the Jacktrip hub server.

| Property | Type | Description |
|---|---|---|
| `hubPatchMode` | HubPatchMode | Patch mode for the hub server. |

**Example Usage:**

```typescript
const jacktripHubServerParams: JacktripHubServerParams = {
  ...jacktripParams,
  hubPatchMode: HubPatchMode.Auto,
};
```

### JacktripHubClientParams

This interface extends the `JacktripParams` interface and defines the parameters for the Jacktrip hub client.

| Property | Type | Description |
|---|---|---|
| `bitRate` | BitRate | Bit rate for the hub client. |
| `clientName` | string | Name of the hub client. |
| `host` | string | Hostname or IP address of the hub server. |
| `receiveChannels` | number | Number of receive channels for the hub client. |
| `redundancy` | number | Redundancy level for the hub client. |
| `sendChannels` | number | Number of send channels for the hub client. |
| `remotePort` | number | Remote port to connect to. |

**Example Usage:**

```typescript
const jacktripHubClientParams: JacktripHubClientParams = {
  ...jacktripParams,
  bitRate: BitRate.High,
  clientName: 'MyHubClient',
  host: '192.168.1.100',
  receiveChannels: 2,
  redundancy: 2,
  sendChannels: 2,
  remotePort: 5555,
};
```

### JacktripP2PServerParams

This interface extends the `JacktripParams` interface and defines the parameters for the Jacktrip P2P server.

| Property | Type | Description |
|---|---|---|
| `bitRate` | BitRate | Bit rate for the P2P server. |
| `clientName` | string | Name of the P2P server. |
| `receiveChannels` | number | Number of receive channels for the P2P server. |
| `redundancy` | number | Redundancy level for the P2P server. |
| `sendChannels` | number | Number of send channels for the P2P server. |

**Example Usage:**

```typescript
const jacktripP2PServerParams: JacktripP2PServerParams = {
  ...jacktripParams,
  bitRate: BitRate.High,
  clientName: 'MyP2PServer',
  receiveChannels: 2,
  redundancy: 2,
  sendChannels: 2,
};
```

### JacktripP2PClientParams

This interface extends the `JacktripP2PServerParams` interface and defines the parameters for the Jacktrip P2P client.

| Property | Type | Description |
|---|---|---|
| `host` | string | Hostname or IP address of the P2P server. |
| `remotePort` | number | Remote port to connect to. |

**Example Usage:**

```typescript
const jacktripP2PClientParams: JacktripP2PClientParams = {
  ...jacktripP2PServerParams,
  host: '192.168.1.100',
  remotePort: 5555,
};
```

### JackParams

This interface defines the parameters for the Jack audio server.

| Property | Type | Description |
|---|---|---|
| `device` | string | Name of the audio device. |
| `inputChannels` | number | Number of input channels. |
| `outputChannels` | number | Number of output channels. |
| `sampleRate` | number | Sample rate in Hz. |
| `bufferSize` | number | Buffer size in samples. |
| `periods` | number | Number of periods. |

**Example Usage:**

```typescript
const jackParams: JackParams = {
  device: 'default',
  inputChannels: 2,
  outputChannels: 2,
  sampleRate: 44100,
  bufferSize: 1024,
  periods: 2,
};
```

### JacktripP2PClient

This interface defines the properties of a Jacktrip P2P client.

| Property | Type | Description |
|---|---|---|
| `localPort` | number | Local port used by the client. |
| `clientName` | string | Name of the client. |
| `host` | string | Hostname or IP address of the P2P server. |

**Example Usage:**

```typescript
const jacktripP2PClient: JacktripP2PClient = {
  localPort: 4444,
  clientName: 'MyP2PClient',
  host: '192.168.1.100',
};
```

### RunningCommand

This interface defines the properties of a running command.

| Property | Type | Description |
|---|---|---|
| `command` | string | The command that is running. |
| `pid` | number | The process ID of the running command. |
| `params` | JacktripParams | The parameters used for the running command. |

**Example Usage:**

```typescript
const runningCommand: RunningCommand = {
  command: 'jacktrip',
  pid: 1234,
  params: jacktripP2PClientParams,
};
```

### HubClients

This interface defines the properties of hub clients.

| Property | Type | Description |
|---|---|---|
| `sendChannels` | string[] | Array of send channel names. |
| `receiveChannels` | string[] | Array of receive channel names. |

**Example Usage:**

```typescript
const hubClients: HubClients = {
  sendChannels: ['send1', 'send2'],
  receiveChannels: ['receive1', 'receive2'],
};
```

### SystemClients

This interface defines the properties of system clients.

| Property | Type | Description |
|---|---|---|
| `captureChannels` | string[] | Array of capture channel names. |
| `playbackChannels` | string[] | Array of playback channel names. |

**Example Usage:**

```typescript
const systemClients: SystemClients = {
  captureChannels: ['capture1', 'capture2'],
  playbackChannels: ['playback1', 'playback2'],
};
```

### ChannelConnection

This interface defines the properties of a channel connection.

| Property | Type | Description |
|---|---|---|
| `source` | string | The source channel name. |
| `destination` | string | The destination channel name. |

**Example Usage:**

```typescript
const channelConnection: ChannelConnection = {
  source: 'send1',
  destination: 'receive1',
};
```

### Config

This interface defines the properties of a configuration.

| Property | Type | Description |
|---|---|---|
| `unit` | number | The unit number. |

**Example Usage:**

```typescript
const config: Config = {
  unit: 1,
};
```

### OptionalParams

This interface defines optional parameters for functions.

| Property | Type | Description |
|---|---|---|
| `onLog` | (message: string) => void | A callback function for logging messages. |

**Example Usage:**

```typescript
const optionalParams: OptionalParams = {
  onLog: (message: string) => {
    console.log(message);
  },
};
```