##  StartJacktripFailedException Class

### Table of Contents

| Section | Description |
|---|---|
| **Overview** |  A brief description of the class and its purpose. |
| **Constructor** | Details of the class constructor. | 
| **Usage** |  Example usage of the class. |


### Overview

The `StartJacktripFailedException` class represents an exception that is raised when Jacktrip fails to start correctly.  It inherits from the base `Exception` class. 

### Constructor

The `StartJacktripFailedException` constructor takes a single argument:

| Argument | Type | Description |
|---|---|---|
| `message` | `string` | A message describing the reason for the failure. |

The constructor sets the exception's message to a string that includes the provided `message` and a prefix indicating that starting Jacktrip failed. It also sets the exception's name to `StartJacktripFailedException`.

```typescript
constructor(message: string) {
  super(`Starting Jacktrip failed; ${message}`);
  this.name = 'StartJacktripFailedException';
}
```

### Usage

The following code demonstrates how to use the `StartJacktripFailedException` class:

```typescript
// Example usage
try {
  // Attempt to start Jacktrip
  startJacktrip();
} catch (error) {
  if (error instanceof StartJacktripFailedException) {
    console.error("Jacktrip failed to start: ", error.message);
  } else {
    console.error("Unexpected error: ", error);
  }
}
```

In this example, if `startJacktrip()` fails, the code will catch the `StartJacktripFailedException` and log the error message. 
