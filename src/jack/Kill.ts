/**
 * Kill All the Jacktrip & Jack Instances
 */

import { spawnSync } from 'child_process';

/**
 * Kills all the Jacktrip instances on the client
 */
export const killJacktrip = () => {
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/IM', 'jacktrip.exe', '/F']);
  }
  spawnSync('killall', ['jacktrip']);
};

/**
 * Kills all the Jack instances on the client
 */
export const killJack = () => {
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/IM', 'jack_connect.exe', '/F']);
    spawnSync('taskkill', ['/IM', 'jackd.exe', '/F']);
  }
  spawnSync('killall', ['jack_connect']);
  spawnSync('killall', ['jackdmp']);
  spawnSync('killall', ['jackd']);
};

/**
 * Kills all the Jack and Jacktrip instances on the client
 */
export const killAllProcesses = () => {
  killJack();
  killJacktrip();
};
