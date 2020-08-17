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
      	- [Import React](#import-react)<!--END-SECTION:setup-toc-->
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
      	- [Union Types and Type Guarding](#union-types-and-type-guarding)
      	- [Optional Types](#optional-types)
      	- [Enum Types](#enum-types)
      	- [Type Assertion](#type-assertion)
      	- [Simulating Nominal Types](#simulating-nominal-types)
      	- [Intersection Types](#intersection-types)
      	- [Union Types](#union-types)
      	- [Overloading Function Types](#overloading-function-types)
      	- [Using Inferred Types](#using-inferred-types)
      	- [Using Partial Types](#using-partial-types)
      	- [The Types I need weren't exported!](#the-types-i-need-werent-exported)<!--END-SECTION:types-toc-->
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
<!--END-SECTION:setup-->

# Section 2: Getting Started

<!--START-SECTION:function-components-->
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
