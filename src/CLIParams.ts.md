## CLI Params Module Documentation

### Table of Contents

* [Introduction](#introduction)
* [CLIParam Interface](#cliparam-interface)
* [CLIParams Class](#cliparams-class)
    * [Constructor](#constructor)
    * [addParam Method](#addparam-method)
    * [toArray Method](#toarray-method)
    * [toStringArray Method](#tostringarray-method)
    * [toString Method](#tostring-method)

### Introduction 

This module provides utilities for handling command-line interface (CLI) parameters. It defines an interface for representing individual CLI parameters and a class for managing a collection of parameters. 

### CLIParam Interface

The `CLIParam` interface defines the structure for representing individual CLI parameters:

| Property | Type | Description |
|---|---|---|
| `flag` | `string` | The flag used to identify the parameter on the command line.  |
| `value` | `string` (optional) | The value associated with the parameter. |

**Example:**

```typescript
{ flag: "-f", value: "filename.txt" } 
```

This represents a command-line parameter with the flag `-f` and the value `filename.txt`.

### CLIParams Class

The `CLIParams` class is used to manage a collection of CLI parameters.

#### Constructor

The constructor initializes an empty set to store the CLI parameters:

```typescript
constructor() {
  this.cliParams = new Set<CLIParam>();
}
```

#### addParam Method

The `addParam` method adds a new `CLIParam` to the collection:

```typescript
addParam(cliParam: CLIParam) {
  this.cliParams.add(cliParam);
}
```

#### toArray Method

The `toArray` method converts the set of `CLIParam` objects into an array:

```typescript
toArray(): CLIParam[] {
  return Array.from(this.cliParams);
}
```

#### toStringArray Method

The `toStringArray` method converts the collection of `CLIParam` objects into an array of strings representing the command-line arguments:

```typescript
toStringArray(): string[] {
  const cliParams = this.toArray();
  const out: string[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const cliParam of cliParams) {
    out.push(cliParam.flag);
    if (cliParam.value) out.push(cliParam.value);
  }
  return out;
}
```

**Example:**

```typescript
const params = new CLIParams();
params.addParam({ flag: "-f", value: "filename.txt" });
params.addParam({ flag: "-o", value: "output.txt" });
console.log(params.toStringArray()); // Output: ["-f", "filename.txt", "-o", "output.txt"]
```

#### toString Method

The `toString` method converts the collection of `CLIParam` objects into a string representing the command-line arguments, suitable for use in a shell command:

```typescript
toString(): string {
  return this.toArray().reduce(
    // eslint-disable-next-line no-return-assign
    (acc, currentValue) =>
      // eslint-disable-next-line no-param-reassign
      (acc = `${acc}${currentValue.flag} ${
        currentValue.value ? `${currentValue.value} ` : ''
      }`),
    ''
  );
}
```

**Example:**

```typescript
const params = new CLIParams();
params.addParam({ flag: "-f", value: "filename.txt" });
params.addParam({ flag: "-o", value: "output.txt" });
console.log(params.toString()); // Output: "-f filename.txt -o output.txt "
```
