## HubPatchModeNotValidException Documentation 

### Table of Contents 
- [Overview](#overview) 
- [Usage](#usage)
- [Example](#example)

### Overview 
This documentation outlines the `HubPatchModeNotValidException` class, which is thrown when an invalid hub patch mode is encountered.

### Usage 
The `HubPatchModeNotValidException` is a subclass of the `Exception` class. It is raised when a function or method encounters an invalid hub patch mode. This class provides a specific error message indicating the valid options for hub patch modes.

### Example 
```javascript
import { HubPatchModeNotValidException } from './HubPatchModeNotValidException';

try {
  // ...code that utilizes a hub patch mode 
} catch (error) {
  if (error instanceof HubPatchModeNotValidException) {
    console.error(error.message); // Output: The Hub Patch Mode is not correct. Correct values are 0=server-to-clients, 1=client loopback, 2=client fan out/in but not loopback, 3=reserved for TUB, 4=full mix, 5=no auto patching.
  }
}
``` 
