/**
 * Kill All the Jacktrip & Jack Instances
 */

import { spawnSync } from 'child_process';
import * as ps from 'ps-node';
import find from 'find-process';

/**
 * Get a process by command
 * @param command the running command
 * @returns
 */
const getRunningProcesses = (
  command: string
): Promise<
  {
    pid: number;
    ppid?: number | undefined;
    uid?: number | undefined;
    gid?: number | undefined;
    name: string;
    cmd: string;
  }[]
> =>
  new Promise((resolve) => {
    find('name', command, true).then((list: any) => {
      resolve(list);
    });
  });

/**
 * Kill a running process by command
 * @param command
 * @returns
 */
const killProcess = (command: string): Promise<void> =>
  new Promise((resolveAllKills, reject) => {
    // get the running processes
    getRunningProcesses(command)
      .then((processes) => {
        // validate if we have processes to kill
        if (!processes || processes.length === 0) resolveAllKills();

        // define all the killing promises
        const allKills = processes.map(
          (process) =>
            new Promise<void>((resolveKill) =>
              // eslint-disable-next-line no-promise-executor-return
              ps.kill(process.pid, { signal: 'SIGKILL', timeout: 10 }, () => {
                resolveKill();
              })
            )
        );

        // wait until the killing is done
        Promise.all(allKills).then(() => resolveAllKills());
      })
      .catch(reject);
  });

/**
 * Kills all the Jack instances on the client
 */
export const killJack = async () => {
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/IM', 'jack_connect.exe', '/F']);
    spawnSync('taskkill', ['/IM', 'jackd.exe', '/F']);
  }
  await killProcess('jackd');
  await killProcess('jackdmp');
  await killProcess('jack_connect');
};

/**
 * Kills all the Jacktrip instances on the client
 */
export const killJacktrip = async () => {
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/IM', 'jacktrip.exe', '/F']);
  }
  await killProcess('jacktrip');
};

/**
 * Kills all the Jack and Jacktrip instances on the client
 */
export const killAllProcesses = async () => {
  await killJack();
  await killJacktrip();
};
