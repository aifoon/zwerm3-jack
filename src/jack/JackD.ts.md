## Jack Daemon Management

**Table of Contents**

* [Introduction](#introduction)
* [Functions](#functions)
    * [getDeviceParams()](#getdeviceparams)
    * [isJackDmpRunning()](#isjackdmprunning)
    * [startJackDmp()](#startjackdmp)
    * [startJackDmpAsync()](#startjackdmpasync)

### Introduction 

This module provides logic for managing the Jack Daemon on a host system. It offers functions to check its status, start it with configurable parameters, and ensure its successful initialization.  

### Functions 

#### getDeviceParams()

```typescript
/**
 * Returns the device parameters for jack to start, OS specific
 *
 * @returns CLIParams
 */
const getDeviceParams = (): CLIParams => {
  const cliParams = new CLIParams();

  // win32 support
  if (process.platform === 'win32') {
    cliParams.addParam({ flag: '-d', value: 'portaudio' });
    cliParams.addParam({ flag: '-d', value: 'ASIO::ASIO4ALL v2' });
  }

  // macos support
  else if (process.platform === 'darwin') {
    cliParams.addParam({ flag: '-d', value: 'coreaudio' });
  }

  // other (alsa)
  else {
    cliParams.addParam({ flag: '-d', value: 'alsa' });
  }

  return cliParams;
};
```

**Purpose:** Returns an object (`CLIParams`) containing OS-specific device parameters for starting the Jack Daemon.

**Parameters:** None

**Returns:** An instance of `CLIParams` with appropriate device flags.

**Logic:**
* Creates a new `CLIParams` object.
* Adds default device parameters based on the operating system:
    * **Windows (win32):** `-d portaudio`, `-d ASIO::ASIO4ALL v2`
    * **macOS (darwin):** `-d coreaudio`
    * **Other (Linux, etc.):** `-d alsa`
* Returns the populated `CLIParams` object.

#### isJackDmpRunning()

```typescript
/**
 * Gets a boolean value if the Jack Daemon is running or not
 * @returns boolean
 */
export const isJackDmpRunning = async (): Promise<boolean> =>
  new Promise<boolean>((resolve, reject) => {
    try {
      find('name', 'jackd', false).then((list: any) => {
        resolve(list.length > 0);
      });
    } catch (e: any) {
      reject(e.message);
    }
  });
```

**Purpose:** Asynchronously checks if the Jack Daemon is currently running.

**Parameters:** None

**Returns:** A Promise resolving to `true` if the Jack Daemon is running, `false` otherwise.

**Logic:**
* Uses the `find-process` library to search for processes named "jackd".
* If any processes are found, resolves the promise with `true`, indicating the Jack Daemon is running.
* If no processes are found, resolves the promise with `false`.
* Catches any errors during the process search and rejects the promise with the error message.

#### startJackDmp()

```typescript
/**
 * Starts a Jack Daemon on the host
 * @param param0 JackParams channels, bufferSize & sampleRate
 * @returns RunningCommand
 */
export const startJackDmp = (
  jackParams: JackParams,
  { onLog }: OptionalParams
): RunningCommand => {
  // Destructure the variables
  const {
    device = '',
    outputChannels = 2,
    inputChannels = 2,
    bufferSize = 256,
    sampleRate = 48000,
    periods = 2,
  } = jackParams;

  // Do some validation
  if (!validateBufferSize(bufferSize)) throw new BufferSizeNotValidException();
  if (!validateSampleRate(sampleRate)) throw new SampleRateNotValidException();

  // Get some information to work with
  const jackPaths = getJackPaths();
  const cliParams = getDeviceParams();

  // Add the soundcard device (if given, defaults the default soundcard driver)
  if (device) cliParams.addParam({ flag: '-d', value: device.toString() });

  // Add the output channels
  if (outputChannels !== -1)
    cliParams.addParam({ flag: '-o', value: outputChannels.toString() });

  // Add the input channels
  if (inputChannels !== -1)
    cliParams.addParam({ flag: '-i', value: inputChannels.toString() });

  // Add the buffersize
  cliParams.addParam({ flag: '-p', value: bufferSize.toString() });

  // Add the samplerate
  cliParams.addParam({ flag: '-r', value: sampleRate.toString() });

  // Specify the number of periods of playback latency.
  if (periods !== -1)
    cliParams.addParam({ flag: '-n', value: periods.toString() });

  try {
    // Create the command
    const command = `** ${jackPaths.jackDmp} ${cliParams.toString()}`;

    // Let them know which command we are running
    if (onLog) onLog(`Running Command: ${command}`);

    // Return the running command
    const runningCommand = {
      command,
      process: spawn(jackPaths.jackDmp, cliParams.toStringArray()),
    };

    // Get the CLI outputs
    runningCommand.process.stdout.on('data', (data) => {
      if (onLog) onLog(data.toString());
    });
    runningCommand.process.stderr.on('data', (data) => {
      if (onLog) onLog(data.toString());
    });

    // Return the command
    return {
      command: runningCommand.command,
      pid: runningCommand.process.pid,
      params: jackParams,
    };
  } catch (e: any) {
    throw new StartJackDmpFailedException(e.message);
  }
};
```

**Purpose:** Starts the Jack Daemon with specified parameters.

**Parameters:**
* **jackParams:** An object containing the following properties:
    * **device:**  (Optional) The specific soundcard device to use.
    * **outputChannels:**  (Optional) Number of output channels, defaults to 2.
    * **inputChannels:**  (Optional) Number of input channels, defaults to 2.
    * **bufferSize:** The size of the audio buffer.
    * **sampleRate:** The audio sample rate.
    * **periods:** (Optional) The number of periods of playback latency, defaults to 2.
* **onLog:** (Optional) A function to handle log messages.

**Returns:** An object containing:
    * **command:** The command used to start the Jack Daemon.
    * **pid:** The process ID of the running Jack Daemon.
    * **params:** The `jackParams` object passed as an argument.

**Logic:**
1. **Validation:**
    * Validates the `bufferSize` and `sampleRate` parameters using the `validateBufferSize` and `validateSampleRate` functions.
    * Throws appropriate exceptions if validation fails.
2. **Parameter Setup:**
    * Retrieves the paths for the Jack Daemon binaries (`jackDmp`) using the `getJackPaths` function.
    * Constructs the `CLIParams` object for the command-line arguments.
    * Adds the device, channels, buffer size, sample rate, and periods parameters to the `CLIParams` object.
3. **Command Execution:**
    * Creates the command string using the Jack Daemon executable path and the constructed `CLIParams`.
    * Logs the running command using the `onLog` function if provided.
    * Spawns the Jack Daemon process using the `child_process.spawn` function.
    * Captures and logs the process's standard output and error streams.
4. **Return:**
    * Returns an object containing the command string, process ID, and the original `jackParams` object.
    * Catches any errors during the process spawning and throws a `StartJackDmpFailedException`.

#### startJackDmpAsync()

```typescript
/**
 * Starts a Jack Daemon on the host and waits until the Jack Daemon is fully started.
 * @param param0 JackParams channels, bufferSize & sampleRate
 * @returns Promise<RunningCommand>
 */
export const startJackDmpAsync = (
  jackParams: JackParams,
  optionalParams: OptionalParams
): Promise<RunningCommand> =>
  new Promise<RunningCommand>((resolve, reject) => {
    try {
      // Init some variables
      const pollTimeout = 5000;
      const pollIntervalTime = 500;
      const maxPolls = pollTimeout / pollIntervalTime;
      let currentPoll = 0;

      // Start the Jack Daemon
      const runningCommand = startJackDmp(jackParams, optionalParams);

      // Start polling and check if Daemon is running via Jack LSP
      const pollInterval = setInterval(() => {
        currentPoll += 1;
        // If max polls are reached, clear the interval and reject the promise
        if (currentPoll > maxPolls) {
          clearInterval(pollInterval);
          reject(
            new RequestTimedOutException(
              'Request Timed Out. Could not start the Jack Daemon.'
            )
          );
        }

        // Are we running?
        isJackDmpRunning().then((isRunning) => {
          // If so, resolve the promise and clear interval
          if (isRunning) {
            clearInterval(pollInterval);
            setTimeout(
              () => resolve(runningCommand),
              TIMEOUT_AFTER_RUNNING_PROCESS
            );
          }
        });
      }, pollIntervalTime);
    } catch (e) {
      reject(e);
    }
  });
```

**Purpose:** Starts the Jack Daemon asynchronously and waits until it is fully initialized.

**Parameters:**
* **jackParams:**  An object containing the desired parameters for the Jack Daemon.
* **optionalParams:** (Optional) An object containing optional parameters.

**Returns:** A Promise that resolves with an object containing:
    * **command:** The command used to start the Jack Daemon.
    * **pid:** The process ID of the running Jack Daemon.
    * **params:** The `jackParams` object passed as an argument.

**Logic:**
1. **Initialization:**
    * Sets up polling variables (timeout, interval, max polls).
2. **Daemon Start:**
    * Starts the Jack Daemon using the `startJackDmp` function.
3. **Polling:**
    * Starts a timer that polls for the running status of the Jack Daemon using the `isJackDmpRunning` function at specified intervals.
4. **Timeout Handling:**
    * If the maximum number of polls is reached without the Jack Daemon being detected as running, the timer is cleared, and the promise is rejected with a `RequestTimedOutException`.
5. **Success Handling:**
    * If the Jack Daemon is detected as running during polling, the timer is cleared, and the promise is resolved with the `runningCommand` object. A short timeout is applied before resolving the promise to allow for the Jack Daemon to fully initialize.
6. **Error Handling:**
    * Catches any errors during the initialization or polling process and rejects the promise with the caught error. 
