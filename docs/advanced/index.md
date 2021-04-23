---
id: intro
sidebar_label: Intro
title: Advanced Cheatsheet
---

**This Advanced Cheatsheet** helps show and explain advanced usage of generic types for people writing reusable type utilities/functions/render prop/higher order components and TS+React **libraries**.

- It also has miscellaneous tips and tricks for pro users.
- Advice for contributing to DefinitelyTyped
- The goal is to take _full advantage_ of TypeScript.

**Creating React + TypeScript Libraries**

The best tool for creating React + TS libraries right now is [`tsdx`](https://github.com/palmerhq/tsdx). Run `npx tsdx create` and select the "react" option. You can view [the React User Guide](https://github.com/palmerhq/tsdx/issues/5) for a few tips on React+TS library best practices and optimizations for production.

Another option is [Rollpkg](https://github.com/rafgraph/rollpkg), which uses Rollup and the TypeScript compiler (not Babel) to create packages. It includes default configs for TypeScript, Prettier, ESLint, and Jest (setup for use with React), as well as Bundlephobia package stats for each build.

- Be sure to also check [`basarat`'s guide](https://basarat.gitbooks.io/typescript/content/docs/quick/library.html) for library tsconfig settings.
- Alec Larson: [The best Rollup config for TypeScript libraries](https://gist.github.com/aleclarson/9900ed2a9a3119d865286b218e14d226)
- From the Angular world, check out https://github.com/bitjson/typescript-starter
