## Constant Variables

This file defines constant variables used throughout the project.

### Table of Contents

1.  [Constants](#constants)
    *   [JACKTRIP\_DEFAULT\_CLIENT\_NAME](#jacktrip_default_client_name)
    *   [JACK\_DEFAULT\_VERSION](#jack_default_version)
    *   [JACKTRIP\_BIN\_PATH](#jacktrip_bin_path)
    *   [JACK\_BASE\_PATH\_WIN](#jack_base_path_win)
    *   [JACK\_BASE\_PATH\_DARWIN](#jack_base_path_darwin)
    *   [JACK\_BASE\_PATH\_LINUX](#jack_base_path_linux)
    *   [TIMEOUT\_AFTER\_RUNNING\_PROCESS](#timeout_after_running_process)

### Constants

#### JACKTRIP\_DEFAULT\_CLIENT\_NAME

The default name for a Jacktrip client.

```javascript
const JACKTRIP_DEFAULT_CLIENT_NAME = 'client';
```

#### JACK\_DEFAULT\_VERSION

The default version of Jack.

```javascript
const JACK_DEFAULT_VERSION = '1.9.19';
```

#### JACKTRIP\_BIN\_PATH

The path to the Jacktrip binaries.

```javascript
const JACKTRIP_BIN_PATH = path.join(__dirname, 'resources/jacktrip/');
```

#### JACK\_BASE\_PATH\_WIN

The default base path for Jack on Windows.

```javascript
const JACK_BASE_PATH_WIN = 'C:\\\\Program Files (x86)\\\\Jack\\\\';
```

#### JACK\_BASE\_PATH\_DARWIN

The default base path for Jack on macOS.

```javascript
const JACK_BASE_PATH_DARWIN = '/usr/local/bin';
```

#### JACK\_BASE\_PATH\_LINUX

The default base path for Jack on Linux.

```javascript
const JACK_BASE_PATH_LINUX = '/usr/bin';
```

#### TIMEOUT\_AFTER\_RUNNING\_PROCESS

The timeout in milliseconds to wait for Jackd and Jacktrip to start after a process has been detected. This timeout is used to give Jackd and Jacktrip time to initialize properly.

```javascript
const TIMEOUT_AFTER_RUNNING_PROCESS = 2000;
```
