---
id: utilities
title: "Troubleshooting Handbook: Utilities"
sidebar_label: Utilities
---

These are all built in, [see source in es5.d.ts](https://github.com/microsoft/TypeScript/blob/33a34e5b96bfe086266f4765ab9789a2a02507f9/src/lib/es5.d.ts#L1523-L1637):

- `Awaited`: emulate the behavior of `await`
- `Capitalize`: convert first character of string literal type to uppercase
- `ConstructorParameters`: a tuple of class constructor's parameter types
- `Exclude`: exclude a type from another type
- `Extract`: select a subtype that is assignable to another type
- `InstanceType`: the instance type you get from a `new`ing a class constructor
- `Lowercase`: convert string literal type to lowercase
- `NonNullable`: exclude `null` and `undefined` from a type
- `Omit`: construct a type with the properties of another type.
- `OmitThisParameter`: remove the 'this' parameter from a function type.
- `Parameters`: a tuple of a function's parameter types
- `Partial`: Make all properties in an object optional
- `Readonly`: Make all properties in an object readonly
- `ReadonlyArray`: Make an immutable array of the given type
- `Pick`: A subtype of an object type with a subset of its keys
- `Record`: A map from a key type to a value type
- `Required`: Make all properties in an object required
- `ReturnType`: A function's return type
- `ThisParameterType`: extract the type of the 'this' parameter of a function type
- `ThisType`: marker for contextual 'this' type
- `Uncapitalize`: convert first character of string literal type to lowercase
- `Uppercase`: convert string literal type to uppercase
