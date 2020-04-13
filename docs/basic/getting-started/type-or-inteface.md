---
id: types_or_interfaces
title: Types or Interfaces?
---

`interface`s are different from `type`s in TypeScript, but they can be used for very similar things as far as common React uses cases are concerned. Here's a helpful rule of thumb:

- always use `interface` for public API's definition when authoring a library or 3rd party ambient type definitions.

- consider using `type` for your React Component Props and State, because it is more constrained.

Types are useful for union types (e.g. `type MyType = TypeA | TypeB`) whereas Interfaces are better for declaring dictionary shapes and then `implementing` or `extending` them.

<details>
  <summary>
    <b>Useful table for Types vs Interfaces</b>
  </summary>
It's a nuanced topic, don't get too hung up on it. Here's a handy graphic:

![https://pbs.twimg.com/media/DwV-oOsXcAIct2q.jpg](https://pbs.twimg.com/media/DwV-oOsXcAIct2q.jpg) (source: [Karol Majewski](https://twitter.com/karoljmajewski/status/1082413696075382785))

</details>

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).
