/**
 * All logic around the Jack System information
 */

import { spawnSync } from 'child_process';
import { SystemClients } from '../interfaces';
import { getJackPaths } from './JackPaths';
import { Exception } from '../exceptions';

/**
 * Gets the current Jack System Clients
 *
 * @returns SystemClients
 */
export const getJackSystemClients = (): SystemClients => {
  try {
    // Get some information to work with
    const jackPaths = getJackPaths();

    // Get the connections
    const result = spawnSync(jackPaths.jackLsp);
    const output = result.stdout.toString().split('\n');

    // Create data vars
    const systemClients: SystemClients = {
      captureChannels: [],
      playbackChannels: [],
    };

    // Loop over connections and add them to the internal arrays
    output.forEach((e) => {
      if (e.includes('capture_')) {
        systemClients.captureChannels.push(e);
      }
      if (e.includes('playback_')) {
        systemClients.playbackChannels.push(e);
      }
    });

    return systemClients;
  } catch (e: any) {
    throw new Exception(e.message);
  }
};
