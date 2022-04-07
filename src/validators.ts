/**
 * A list of validators to check the incoming values
 */

/**
 * Returns a boolean if the given buffersize is correct
 *
 * @param bufferSize A number the represents the buffersize
 * @returns boolean
 */
export const validateBufferSize = (bufferSize: number): boolean =>
  [16, 32, 64, 128, 256, 512, 1024, 2048, 4096].includes(Number(bufferSize));

/**
 * Returns a boolean if the sample rate is correct
 */
export const validateSampleRate = (sampleRate: number): boolean =>
  [22050, 32000, 44100, 48000, 88200, 96000, 192000].includes(
    Number(sampleRate)
  );

/**
 * Returns a boolean if the given bitrate is correct
 * @param bitRate A number the represents the bitrate
 * @returns boolean
 */
export const validateBitRate = (bitRate: number): boolean =>
  [8, 16, 24, 32].includes(bitRate);

/**
 * Returns a boolean if the given hub patch mode is correct
 * @param hubPatchMode A number the represents the hub patch mode
 * @returns boolean
 */
export const validateHubPatchMode = (hubPatchMode: number): boolean =>
  [1, 2, 3, 4, 5].includes(hubPatchMode);
