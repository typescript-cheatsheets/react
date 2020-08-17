<div align="center">
<h1>React+TypeScript Cheatsheets</h1>

<a href="https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/81">
  <img
    height="90"
    width="90"
    alt="react + ts logo"
    src="https://user-images.githubusercontent.com/6764957/53868378-2b51fc80-3fb3-11e9-9cee-0277efe8a927.png"
    align="left"
  />
</a>

<p>Cheatsheets for experienced React developers getting started with TypeScript</p>

[**Web docs**](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup) |
[中文翻译](https://github.com/fi3ework/blog/tree/master/react-typescript-cheatsheet-cn) |
[**Español**](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet-es) |
[Contribute!](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/CONTRIBUTING.md) |
[Ask!](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new/choose)

</div>

---

<div align="center">

:wave: This repo is maintained by [@swyx](https://twitter.com/swyx), [@ferdaber](https://twitter.com/ferdaber), [@eps1lon](https://twitter.com/sebsilbermann), [@IslamAttrash](https://twitter.com/IslamAttrash), [@jsjoeio](https://twitter.com/jsjoeio) and [@arvindcheenu](https://twitter.com/arvincheenu), we're so happy you want to try out TypeScript with React! If you see anything wrong or missing, please [file an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new/choose)! :+1:

</div>

---

[![All Contributors](https://img.shields.io/github/contributors/typescript-cheatsheets/react-typescript-cheatsheet?color=orange&style=flat-square)](/CONTRIBUTORS.md)

## All React + TypeScript Cheatsheets

- **The Basic Cheatsheet** ([`/README.md`](/README.md#basic-cheatsheet-table-of-contents)) is focused on helping React devs just start using TS in React **apps**
  - Focus on opinionated best practices, copy+pastable examples.
  - Explains some basic TS types usage and setup along the way.
  - Answers the most Frequently Asked Questions.
  - Does not cover generic type logic in detail. Instead we prefer to teach simple troubleshooting techniques for newbies.
  - The goal is to get effective with TS without learning _too much_ TS.
- **The Advanced Cheatsheet** ([`/ADVANCED.md`](https://react-typescript-cheatsheet.netlify.app/docs/advanced/intro)) helps show and explain advanced usage of generic types for people writing reusable type utilities/functions/render prop/higher order components and TS+React **libraries**.
  - It also has miscellaneous tips and tricks for pro users.
  - Advice for contributing to DefinitelyTyped.
  - The goal is to take _full advantage_ of TypeScript.
- **The Migrating Cheatsheet** ([`/MIGRATING.md`](https://react-typescript-cheatsheet.netlify.app/docs/migration/intro)) helps collate advice for incrementally migrating large codebases from JS or Flow, **from people who have done it**.
  - We do not try to convince people to switch, only to help people who have already decided.
  - ⚠️This is a new cheatsheet, all assistance is welcome.
- **The HOC Cheatsheet** ([`/HOC.md`](https://react-typescript-cheatsheet.netlify.app/docs/hoc/intro)) specifically teaches people to write HOCs with examples.
  - Familiarity with [Generics](https://www.typescriptlang.org/docs/handbook/generics.html) is necessary.
  - ⚠️This is the newest cheatsheet, all assistance is welcome.

---

### Basic Cheatsheet Table of Contents

<details>

<summary><b>Expand Table of Contents</b></summary>

- [Section 1: Setup](#section-1-setup)
<!--START-SECTION:setup-toc-->
	- [Prerequisites](#prerequisites)
	- [React + TypeScript Starter Kits](#react--typescript-starter-kits)
	- [Import React](#import-react)
<!--END-SECTION:setup-toc-->
- [Section 2: Getting Started](#section-2-getting-started)
  - [Function Components](#function-components)
  - [Hooks](#hooks)
  - [Class Components](#class-components)
  - [Typing defaultProps](#typing-defaultprops)
  - [Types or Interfaces?](#types-or-interfaces)
  - [Basic Prop Types Examples](#basic-prop-types-examples)
  - [Useful React Prop Type Examples](#useful-react-prop-type-examples)
  - [getDerivedStateFromProps](#getDerivedStateFromProps)
  - [Forms and Events](#forms-and-events)
  - [Context](#context)
  - [forwardRef/createRef](#forwardrefcreateref)
  - [Portals](#portals)
  - [Error Boundaries](#error-boundaries)
  - [Concurrent React/React Suspense](#concurrent-reactreact-suspense)
- [Basic Troubleshooting Handbook: Types](#basic-troubleshooting-handbook-types)
<!--START-SECTION:types-toc-->
<!--END-SECTION:types-toc-->
- [Troubleshooting Handbook: Operators](#troubleshooting-handbook-operators)
- [Troubleshooting Handbook: Utilties](#troubleshooting-handbook-utilities)
- [Troubleshooting Handbook: tsconfig.json](#troubleshooting-handbook-tsconfigjson)
- [Troubleshooting Handbook: Bugs in official typings](#troubleshooting-handbook-bugs-in-official-typings)
- [Recommended React + TypeScript codebases to learn from](#recommended-react--typescript-codebases-to-learn-from)
- [Editor Tooling and Integration](#editor-tooling-and-integration)
- [Linting](#linting)
- [Other React + TypeScript resources](#other-react--typescript-resources)
- [Recommended React + TypeScript talks](#recommended-react--typescript-talks)
- [Time to Really Learn TypeScript](#time-to-really-learn-typescript)
- [Example App](#example-app)
- [My question isn't answered here!](#my-question-isnt-answered-here)
  </details>

<!--START-SECTION:setup-->
## Prerequisites

1. good understanding of [React](https://reactjs.org)
2. familiarity with [TypeScript Types](https://www.typescriptlang.org/docs/handbook/basic-types.html) ([2ality's guide](http://2ality.com/2018/04/type-notation-typescript.html) is helpful. If you’re an absolute beginner in TypeScript, check out [chibicode’s tutorial](https://ts.chibicode.com/todo/).)
3. having read [the TypeScript section in the official React docs](https://reactjs.org/docs/static-type-checking.html#typescript).
4. having read [the React section of the new TypeScript playground](http://www.typescriptlang.org/play/index.html?jsx=2&esModuleInterop=true&e=181#example/typescript-with-react) (optional: also step through the 40+ examples under [the playground's](http://www.typescriptlang.org/play/index.html) Examples section)

This guide will always assume you are starting with the latest TypeScript version. Notes for older versions will be in expandable `<details>` tags.

## React + TypeScript Starter Kits

1. [Create React App v2.1+ with TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript): `npx create-react-app my-app --template typescript`

- We used to recommend `create-react-app-typescript` but it is now [deprecated](https://www.reddit.com/r/reactjs/comments/a5919a/createreactapptypescript_has_been_archived_rip/). [see migration instructions](https://vincenttunru.com/migrate-create-react-app-typescript-to-create-react-app/)

2. [Basarat's guide](https://github.com/basarat/typescript-react/tree/master/01%20bootstrap) for **manual setup** of React + TypeScript + Webpack + Babel

- In particular, make sure that you have `@types/react` and `@types/react-dom` installed ([Read more about the DefinitelyTyped project if you are unfamiliar](https://definitelytyped.org/))
- There are also many React + TypeScript boilerplates, please see [our Resources list below](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#recommended-react--typescript-codebases-to-learn-from).

## Import React

```tsx
import * as React from "react";
import * as ReactDOM from "react-dom";
```

In [TypeScript 2.7+](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html), you can run TypeScript with `--allowSyntheticDefaultImports` (or add `"allowSyntheticDefaultImports": true` to tsconfig) to import like in regular jsx:

```tsx
import React from "react";
import ReactDOM from "react-dom";
```

<details>

<summary>Explanation</summary>

Why `allowSyntheticDefaultImports` over `esModuleInterop`? [Daniel Rosenwasser](https://twitter.com/drosenwasser/status/1003097042653073408) has said that it's better for webpack/parcel. For more discussion check out <https://github.com/wmonk/create-react-app-typescript/issues/214>

You should also check [the new TypeScript docs for official descriptions between each compiler flag](https://www.typescriptlang.org/v2/en/tsconfig#allowSyntheticDefaultImports)!

</details>

<!--END-SECTION:setup-->

# Section 2: Getting Started

<!--START-SECTION:function-components-->
## Function Components

These can be written as normal functions that take a `props` argument and return a JSX element.

```tsx
type AppProps = { message: string }; /* could also use interface */
const App = ({ message }: AppProps) => <div>{message}</div>;
```

<details>

<summary><b>What about `React.FC`/`React.FunctionComponent`?</b></summary>

You can also write components with `React.FunctionComponent` (or the shorthand `React.FC` - they are the same):

```tsx
const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
  <div>{message}</div>
);
```

Some differences from the "normal function" version:

- `React.FunctionComponent` is explicit about the return type, while the normal function version is implicit (or else needs additional annotation).

- It provides typechecking and autocomplete for static properties like `displayName`, `propTypes`, and `defaultProps`.

  - Note that there are some known issues using `defaultProps` with `React.FunctionComponent`. See [this issue for details](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/87). We maintain a separate `defaultProps` section you can also look up.

- It provides an implicit definition of `children` (see below) - however there are some issues with the implicit `children` type (e.g. [DefinitelyTyped#33006](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33006)), and it might considered better style to be explicit about components that consume `children`, anyway.

```tsx
const Title: React.FunctionComponent<{ title: string }> = ({
  children,
  title,
}) => <div title={title}>{children}</div>;
```

- _In the future_, it may automatically mark props as `readonly`, though that's a moot point if the props object is destructured in the parameter list.

In most cases it makes very little difference which syntax is used, but you may prefer the more explicit nature of `React.FunctionComponent`.

</details>

<details>
<summary><b>Minor Pitfalls</b></summary>

These patterns are not supported:

**Conditional rendering**

```tsx
const MyConditionalComponent = ({ shouldRender = false }) =>
  shouldRender ? <div /> : false; // don't do this in JS either
const el = <MyConditionalComponent />; // throws an error
```

This is because due to limitations in the compiler, function components cannot return anything other than a JSX expression or `null`, otherwise it complains with a cryptic error message saying that the other type is not assignable to `Element`.

```tsx
const MyArrayComponent = () => Array(5).fill(<div />);
const el2 = <MyArrayComponent />; // throws an error
```

**Array.fill**

Unfortunately just annotating the function type will not help so if you really need to return other exotic types that React supports, you'd need to perform a type assertion:

```tsx
const MyArrayComponent = () => (Array(5).fill(<div />) as any) as JSX.Element;
```

[See commentary by @ferdaber here](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/57).

</details>

<!--END-SECTION:function-components-->

<!--START-SECTION:hooks-->
<!--END-SECTION:hooks-->

<!--START-SECTION:class-components-->
<!--END-SECTION:class-components-->

<!--START-SECTION:default-props-->
<!--END-SECTION:default-props-->

<!--START-SECTION:type-or-interface-->
<!--END-SECTION:type-or-interface-->

<!--START-SECTION:basic-type-examples-->
<!--END-SECTION:basic-type-examples-->

<!--START-SECTION:react-prop-type-examples-->
<!--END-SECTION:react-prop-type-examples-->

<!--START-SECTION:get-derived-state-from-props-->
<!--END-SECTION:get-derived-state-from-props-->

<!--START-SECTION:forms-and-events-->
<!--END-SECTION:forms-and-events-->

<!--START-SECTION:context-->
<!--END-SECTION:context-->

<!--START-SECTION:forward-create-ref-->
<!--END-SECTION:forward-create-ref-->

<!--START-SECTION:portals-->
<!--END-SECTION:portals-->

<!--START-SECTION:error-boundaries-->
<!--END-SECTION:error-boundaries-->

<!--START-SECTION:concurrent-->
<!--END-SECTION:concurrent-->

<!--START-SECTION:types-->
<!--END-SECTION:types-->

<!--START-SECTION:operators-->
<!--END-SECTION:operators-->

<!--START-SECTION:utilities-->
<!--END-SECTION:utilities-->

<!--START-SECTION:ts-config-->
<!--END-SECTION:ts-config-->

<!--START-SECTION:official-typings-bugs-->
<!--END-SECTION:official-typings-bugs-->

<!--START-SECTION:non-ts-files-->
<!--END-SECTION:non-ts-files-->

<!--START-SECTION:resources-->
<!--END-SECTION:resources-->

<!--START-SECTION:editor-integration-->
<!--END-SECTION:editor-integration-->

<!--START-SECTION:linting-->
<!--END-SECTION:linting-->

<!--START-SECTION:other-resources-->
<!--END-SECTION:other-resources-->

<!--START-SECTION:talks-->
<!--END-SECTION:talks-->

<!--START-SECTION:learn-ts-->
<!--END-SECTION:learn-ts-->

<!--START-SECTION:examples-->
<!--END-SECTION:examples-->

# My question isn't answered here!

- [File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).

## Contributors

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. See [CONTRIBUTORS.md](/CONTRIBUTORS.md) for the full list. Contributions of any kind welcome!
