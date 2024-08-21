##  Zwerm3Jack Tests 🧪

This document provides an internal overview of the tests implemented for the Zwerm3Jack package. 

**Table of Contents**

* [Paths Tests](#paths-tests)
* [Jack and Jacktrip Tests](#jack-and-jacktrip-tests)


### Paths Tests 🗺️

This test suite verifies the retrieval of Jacktrip paths. 

**Test Case:** `Testing Jacktrip paths`

* **Purpose:** Checks if the `getJacktripPaths` function returns an object with the expected properties.
* **Steps:** 
    1. Obtain the Jacktrip paths using `getJacktripPaths`.
    2. Assert that the returned object has a property named 'jackTrip'.

### Jack and Jacktrip Tests 🔌

This test suite evaluates the interaction and operation of Jack and Jacktrip services.

**Test Case:** `Running Jack and multiple Jacktrip clients` 

* **Purpose:**  Asserts that multiple Jacktrip clients can be started concurrently with Jack running. 
* **Steps:**
    1. Terminate any existing Jack and Jacktrip processes.
    2. Start Jack using `startJackDmpAsync` with specified configurations.
    3. Start multiple Jacktrip clients using `startJacktriptP2PMultipleClientsAsync` with different ports and client names.
    4. Retrieve the running Jacktrip processes using `getRunningProcesses`.
    5. Compare the number of running Jacktrip processes with the number of started client commands.

**Test Case:** `Running Jack and Jacktrip` 

* **Purpose:**  Asserts that Jack and Jacktrip services can be started and are operational.
* **Steps:** 
    1. Terminate any existing Jack and Jacktrip processes.
    2. Start Jack using `startJackDmpAsync` with specified configurations.
    3. Start Jacktrip server using `startJacktripP2PServer`.
    4. Verify that Jack and Jacktrip services are running using `isJackDmpRunning` and `isJacktripRunning` respectively.
    5. Retrieve Jack system clients using `getJackSystemClients`. 
    6. Assert that the number of captured and playback channels is greater than zero.
    7. Assert that both Jack and Jacktrip are running. 
