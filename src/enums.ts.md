## Jacktrip Enumerations

This document provides an internal overview of the enums used within Jacktrip. 

### Table of Contents
* [BitRate](#bit-rate)
* [HubPatchMode](#hub-patch-mode)
* [StartJacktripType](#start-jacktrip-type)

### BitRate 

This enum defines various bitrates used within Jacktrip.

| Value      | Description |
|-------------|-------------|
| Eight      | 8 bits per sample |
| Sixteen    | 16 bits per sample |
| TwentyFour | 24 bits per sample |
| ThirtyTwo  | 32 bits per sample |

### HubPatchMode

This enum describes different modes of patching within a Jacktrip hub. More information on these modes can be found at: [https://ccrma.stanford.edu/docs/common/IETF.html#hub-patching](https://ccrma.stanford.edu/docs/common/IETF.html#hub-patching)

| Value                      | Description                                                                                                                     |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| ServerToClients           | The server sends audio to all clients, but clients cannot send audio back to the server.                                          |
| ClientLoopback             | Clients can loop back their own audio to themselves, but cannot send audio to the server or other clients.                     |
| ClientFanOutInButNotLoopback | Clients can send audio to the server and other clients, but cannot loop back their own audio.                                     |
| ReservedForTUB            | Reserved for use by the T.U.B. (Transmitting Universal Bridge) software.                                                             |
| FullMix                    | All clients can send and receive audio from all other clients, including the server.                                             |
| NoConnections              | No audio connections are established. This mode is primarily used for configuring the hub before establishing audio connections. |

### StartJacktripType

This enum defines the different Jacktrip types.

| Value       | Description                                          |
|-------------|---------------------------------------------------|
| HubServer   | A Jacktrip hub acting as a server.                 |
| HubClient   | A Jacktrip hub acting as a client.                 |
| P2PServer   | A Jacktrip peer-to-peer connection acting as a server. |
| P2PClient  | A Jacktrip peer-to-peer connection acting as a client. | 
