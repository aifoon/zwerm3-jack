/**
 * A File With all Fixed enum data
 */

export enum BitRate {
  Eight = 8,
  Sixteen = 16,
  TwentyFour = 24,
  ThirtyTwo = 32,
}

/**
 * More info on HubPatchMode can be found on: https://ccrma.stanford.edu/docs/common/IETF.html#hub-patching
 */
export enum HubPatchMode {
  ServerToClients = 0,
  ClientLoopback = 1,
  ClientFanOutInButNotLoopback = 2,
  ReservedForTUB = 3,
  FullMix = 4,
  NoConnections = 5,
}
