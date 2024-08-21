## BitRateNotValidException

### Table of Contents
* [Description](#description)
* [Constructor](#constructor)

### Description

This class represents an exception that is raised when the bitrate provided is invalid. 

### Constructor

```typescript
constructor()
```

**Description:**
Constructs a new `BitRateNotValidException` instance.

**Parameters:**

* None

**Returns:**

* None

**Throws:**

* None

**Example:**

```typescript
try {
  // ... code that might throw BitRateNotValidException
} catch (error) {
  if (error instanceof BitRateNotValidException) {
    console.error(error.message); // Outputs: 'The BitRate is not correct. Correct values are 8 | 16 | 24 | 32.'
  }
}
```
