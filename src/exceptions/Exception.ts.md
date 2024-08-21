## Exception Class Documentation

**Table of Contents**

* [Introduction](#introduction)
* [Usage](#usage)
* [Example](#example)

### Introduction <a name="introduction"></a>

This code defines a generic `Exception` class, extending the built-in `Error` class. This class serves as a base exception for any errors that might occur within the application.

**Purpose:**

* Provides a consistent error handling mechanism.
* Allows for easy error identification and debugging.

### Usage <a name="usage"></a>

To use the `Exception` class, simply throw an instance of it when an error occurs:

```javascript
throw new Exception("Something went wrong!");
```

### Example <a name="example"></a>

```javascript
// Example: Division by zero error
function divide(a, b) {
  if (b === 0) {
    throw new Exception("Cannot divide by zero!");
  }
  return a / b;
}

try {
  const result = divide(10, 0);
  console.log(result);
} catch (error) {
  console.error("Error:", error.message);
}
```

**Output:**

```
Error: Cannot divide by zero!
```