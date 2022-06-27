/**
 * All logic around the Jacktrip Hub information
 */

import { spawnSync } from 'child_process';
import { HubClients } from '../interfaces';
import { getJackPaths } from './JackPaths';
import { Exception } from '../exceptions';

/**
 * Gets the current JackTrip Hub Clients
 *
 * @returns HubClients
 */
export const getJackHubClients = (): Promise<HubClients> => {
  try {
    return new Promise((resolve) => {
      // Get some information to work with
      const jackPaths = getJackPaths();

      // Get the connections
      const result = spawnSync(jackPaths.jackLsp);

      // delay before for fetching the stdout result
      setTimeout(() => {
        const output = result.stdout.toString().split('\n');

        // Create data vars
        const hubClients: HubClients = {
          sendChannels: [],
          receiveChannels: [],
        };

        // Loop over connections and add them to the internal arrays
        output.forEach((e) => {
          if (e.includes('send_')) {
            hubClients.sendChannels.push(e);
          }
          if (e.includes('receive_')) {
            hubClients.receiveChannels.push(e);
          }
        });

        resolve(hubClients);
      }, 750);
    });
  } catch (e: any) {
    throw new Exception(e.message);
  }
};
