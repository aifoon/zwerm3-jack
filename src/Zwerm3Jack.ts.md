## Zwerm3Jack Configuration Class Documentation

### Table of Contents

| Section | Description |
|---|---|
| [Zwerm3Jack Class](#zwerm3jack-class) | Configuration options for the Zwerm3Jack library. |
| [jackFolderPath](#jackfolderpath) | Path to the JACK server folder. |
| [jacktripBinPath](#jacktripbinpath) | Path to the Jacktrip binary. |
| [hasCustomJackFolderPath](#hascustomjackfolderpath) | Checks if a custom JACK server folder path is set. |
| [hasCustomJacktripBinPath](#hascustomjacktripbinpath) | Checks if a custom Jacktrip binary path is set. |


### Zwerm3Jack Class

The `Zwerm3Jack` class provides a centralized location to store configuration options for the Zwerm3Jack library. These options can be modified at initialization, allowing for flexible integration with different environments.

**Properties:**

| Property | Description |
|---|---|
| `jackFolderPath` | 📁  The path to the folder containing the JACK server binaries, including `jackd`, `jack_connect`, `jack_disconnect`, and `jack_lsp`. |
| `jacktripBinPath` | 💻 The path to the Jacktrip binary. |


**Methods:**

| Method | Description |
|---|---|
| `hasCustomJackFolderPath` | 🔍 Returns `true` if a custom JACK server folder path has been set, otherwise `false`. |
| `hasCustomJacktripBinPath` | 🔍 Returns `true` if a custom Jacktrip binary path has been set, otherwise `false`. |


### jackFolderPath

This property holds the path to the JACK server folder, which contains the following binaries:

* `jackd`: JACK server daemon.
* `jack_connect`: Utility for connecting JACK clients.
* `jack_disconnect`: Utility for disconnecting JACK clients.
* `jack_lsp`: Utility for listing JACK ports.


### jacktripBinPath

This property holds the path to the Jacktrip binary, which is responsible for managing audio routing and communication between JACK clients.


### hasCustomJackFolderPath

This method checks if a custom JACK server folder path has been set. It returns `true` if `jackFolderPath` is not an empty string, indicating that a custom path has been provided. Otherwise, it returns `false`.


### hasCustomJacktripBinPath

This method checks if a custom Jacktrip binary path has been set. It returns `true` if `jacktripBinPath` is not an empty string, indicating that a custom path has been provided. Otherwise, it returns `false`. 
