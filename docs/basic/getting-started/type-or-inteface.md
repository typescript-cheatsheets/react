---
id: types_or_interfaces
title: Types or Interfaces?
---

`interface`s are different from `type`s in TypeScript, but they can be used for very similar things as far as common React uses cases are concerned. Here's a helpful rule of thumb:

- always use `interface` for public API's definition when authoring a library or 3rd party ambient type definitions, as this allows a consumer to extend them via _declaration merging_ if some definitions are missing.

- consider using `type` for your React Component Props and State, for consistency and because it is more constrained.

You can read more about the reasoning behind this rule of thumb in [Interface vs Type alias in TypeScript 2.7](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c).

Types are useful for union types (e.g. `type MyType = TypeA | TypeB`) whereas Interfaces are better for declaring dictionary shapes and then `implementing` or `extending` them.

<details>
  <summary>
    <b>Useful table for Types vs Interfaces</b>
  </summary>
It's a nuanced topic, don't get too hung up on it. Here's a handy table:

| Aspect | Type | Interface |
| ------ | :----: | :---------: |
| Can describe functions | ✅ | ✅ |
| Can describe constructors | ✅ | ✅ |
| Can describe tuples | ✅ | ✅ |
| Interfaces can extend it | ⚠️ | ✅ |
| Classes can extend it | 🚫 | ✅ |
| Classes can implement it (`implements`) | ⚠️ | ✅ |
| Can intersect another one of its kind | ✅ | ⚠️ |
| Can create a union with another one of its kind | ✅ | 🚫 |
| Can be used to create mapped types | ✅ | 🚫 |
| Can be mapped over with mapped types | ✅ | ✅ |
| Expands in error messages and logs | ✅ | 🚫 |
| Can be augmented | 🚫 | ✅ |
| Can be recursive | ⚠️ | ✅ |

⚠️ In some cases

(source: [Karol Majewski](https://twitter.com/karoljmajewski/status/1082413696075382785))

</details>

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).
