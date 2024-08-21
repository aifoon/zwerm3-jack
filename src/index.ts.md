## Zwerm3 Jack Logic 

**Table of Contents**

| Section | Description |
|---|---|
| [Introduction](#introduction) | Overview of the Zwerm3 Jack logic |
| [Exports](#exports) | Exported functions and modules |

### Introduction 

This module contains all the logic related to the Zwerm3 Jack system, providing functions to manage Jack and Jacktrip processes, as well as related operations. The code imports necessary functions and modules from various sub-modules within the `jack` directory. 

### Exports

This module exports a comprehensive set of functions and modules for managing Jack and Jacktrip functionalities. These exports cover various aspects including:

**Jack and Jacktrip Process Management:**
* **`connectChannel`:** Connects a channel within the Jack system.
* **`disconnectChannel`:** Disconnects a channel within the Jack system.
* **`getJackPaths`:** Retrieves paths related to Jack.
* **`getJacktripPaths`:** Retrieves paths related to Jacktrip.
* **`isJackDmpRunning`:** Checks if the Jack daemon (`jackdmp`) is running.
* **`isJacktripRunning`:** Checks if Jacktrip is running.
* **`getJackHubClients`:** Gets a list of Jack Hub clients.
* **`getJackSystemClients`:** Gets a list of Jack system clients.
* **`getRunningProcesses`:**  Retrieves information about running processes.
* **`killAllProcesses`:** Kills all running processes.
* **`killJacktrip`:** Kills the Jacktrip process.
* **`killJack`:** Kills the Jack process.
* **`killProcessByPid`:** Kills a process based on its process ID (PID).
* **`startJackDmp`:** Starts the Jack daemon (`jackdmp`).
* **`startJackDmpAsync`:** Asynchronously starts the Jack daemon (`jackdmp`).
* **`startJacktripHubServer`:** Starts a Jacktrip Hub server.
* **`startJacktripHubServerAsync`:** Asynchronously starts a Jacktrip Hub server.
* **`startJacktripHubClient`:** Starts a Jacktrip Hub client.
* **`startJacktripHubClientAsync`:** Asynchronously starts a Jacktrip Hub client.
* **`startJacktripP2PServer`:** Starts a Jacktrip peer-to-peer (P2P) server.
* **`startJacktripP2PServerAsync`:** Asynchronously starts a Jacktrip peer-to-peer (P2P) server.
* **`startJacktripP2PClient`:** Starts a Jacktrip peer-to-peer (P2P) client.
* **`startJacktripP2PClientAsync`:** Asynchronously starts a Jacktrip peer-to-peer (P2P) client.
* **`startJacktriptP2PMultipleClientsAsync`:** Asynchronously starts multiple Jacktrip peer-to-peer (P2P) clients.

**Types and Enums:**
* **`Zwerm3JackTypes`:** Contains types related to Zwerm3 Jack.
* **`Zwerm3JackEnums`:** Contains enums related to Zwerm3 Jack.
* **`Zwerm3Jack`:**  Provides access to the core Zwerm3 Jack functionality. 

This module provides a comprehensive set of tools for interacting with Jack and Jacktrip within the Zwerm3 system. The exports cover a wide range of functionalities, enabling developers to manage, control, and interact with these audio systems effectively. 
