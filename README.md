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
- [Recommended React + TypeScript talks](#recommended-react--typescript-talks)
- [Editor Tooling and Integration](#editor-tooling-and-integration)
- [Linting](#linting)
- [Other React + TypeScript resources](#other-react--typescript-resources)
- [Time to Really Learn TypeScript](#time-to-really-learn-typescript)
- [Example App](#example-app)
- [My question isn't answered here!](#my-question-isnt-answered-here)
  </details>

# Section 1: Setup

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

# Basic Troubleshooting Handbook: Types

<!--START-SECTION:types-->
<!--END-SECTION:types-->

# Troubleshooting Handbook: Images and other non-TS/TSX files

Use [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html):

```ts
// declaration.d.ts
// anywhere in your project, NOT the same name as any of your .ts/tsx files
declare module "*.png";

// importing in a tsx file
import * as logo from "./logo.png";
```

Note that `tsc` cannot bundle these files for you, you will have to use Webpack or Parcel.

Related issue: https://github.com/Microsoft/TypeScript-React-Starter/issues/12 and [StackOverflow](https://stackoverflow.com/a/49715468/4216035)

# Troubleshooting Handbook: Operators

- `typeof` and `instanceof`: type query used for refinement
- `keyof`: get keys of an object
- `O[K]`: property lookup
- `[K in O]`: mapped types
- `+` or `-` or `readonly` or `?`: addition and subtraction and readonly and optional modifiers
- `x ? Y : Z`: Conditional types for generic types, type aliases, function parameter types
- `!`: Nonnull assertion for nullable types
- `=`: Generic type parameter default for generic types
- `as`: type assertion
- `is`: type guard for function return types

Conditional Types are a difficult topic to get around so here are some extra resources:

- fully walked through explanation https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/
- Bailing out and other advanced topics https://github.com/sw-yx/ts-spec/blob/master/conditional-types.md

# Troubleshooting Handbook: Utilities

these are all built in, [see source in es5.d.ts](https://github.com/microsoft/TypeScript/blob/2c458c0d1ccb96442bca9ce43aa987fb0becf8a9/src/lib/es5.d.ts#L1401-L1474):

- `ConstructorParameters`: a tuple of class constructor's parameter types
- `Exclude`: exclude a type from another type
- `Extract`: select a subtype that is assignable to another type
- `InstanceType`: the instance type you get from a `new`ing a class constructor
- `NonNullable`: exclude `null` and `undefined` from a type
- `Parameters`: a tuple of a function's parameter types
- `Partial`: Make all properties in an object optional
- `Readonly`: Make all properties in an object readonly
- `ReadonlyArray`: Make an immutable array of the given type
- `Pick`: A subtype of an object type with a subset of its keys
- `Record`: A map from a key type to a value type
- `Required`: Make all properties in an object required
- `ReturnType` A function's return type

This section needs writing, but you can probably find a good starting point with [Wes Bos' ESLint config](https://github.com/wesbos/eslint-config-wesbos) (which comes with a [YouTube intro](https://www.youtube.com/watch?v=lHAeK8t94as)).

# Troubleshooting Handbook: tsconfig.json

You can find [all the Compiler options in the TypeScript docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html). [The TS docs also has per-flag annotations of what each does](https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports). This is the setup I roll with for APPS (not libraries - for libraries you may wish to see the settings we use in `tsdx`):

```json
{
  "compilerOptions": {
    "incremental": true,
    "outDir": "build/lib",
    "target": "es5",
    "module": "esnext",
    "lib": ["dom", "esnext"],
    "sourceMap": true,
    "importHelpers": true,
    "declaration": true,
    "rootDir": "src",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowJs": false,
    "jsx": "react",
    "moduleResolution": "node",
    "baseUrl": "src",
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "suppressImplicitAnyIndexErrors": true,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "build", "scripts"]
}
```

Please open an issue and discuss if there are better recommended choices for React.

Selected flags and why we like them:

- `esModuleInterop`: disables namespace imports (`import * as foo from "foo"`) and enables CJS/AMD/UMD style imports (`import fs from "fs"`)
- `strict`: `strictPropertyInitialization` forces you to initialize class properties or explicitly declare that they can be undefined. You can opt out of this with a definite assignment assertion.
- `"typeRoots": ["./typings", "./node_modules/@types"]`: By default, TypeScript looks in `node_modules/@types` and parent folders for third party type declarations. You may wish to override this default resolution so you can put all your global type declarations in a special `typings` folder.

Compilation speed grows linearly with size of codebase. For large projects, you will want to use [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html). See our [ADVANCED](ADVANCED.md) cheatsheet for commentary.

# Troubleshooting Handbook: Bugs in official typings

If you run into bugs with your library's official typings, you can copy them locally and tell TypeScript to use your local version using the "paths" field. In your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "mobx-react": ["../typings/modules/mobx-react"]
    }
  }
}
```

[Thanks to @adamrackis for the tip.](https://twitter.com/AdamRackis/status/1024827730452520963)

If you just need to add an interface, or add missing members to an existing interface, you don't need to copy the whole typing package. Instead, you can use [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html):

```tsx
// my-typings.ts
declare module "plotly.js" {
  interface PlotlyHTMLElement {
    removeAllListeners(): void;
  }
}

// MyComponent.tsx
import { PlotlyHTMLElement } from "plotly.js";

const f = (e: PlotlyHTMLElement) => {
  e.removeAllListeners();
};
```

You dont always have to implement the module, you can simply import the module as `any` for a quick start:

```tsx
// my-typings.ts
declare module "plotly.js"; // each of its imports are `any`
```

Because you don't have to explicitly import this, this is known as an [ambient module declaration](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html#pitfalls-of-namespaces-and-modules). You can do AMD's in a script-mode `.ts` file (no imports or exports), or a `.d.ts` file anywhere in your project.

You can also do ambient variable and ambient type declarations:

```ts
// ambient utiltity type
type ToArray<T> = T extends unknown[] ? T : T[];
// ambient variable
declare let process: {
  env: {
    NODE_ENV: "development" | "production";
  };
};
process = {
  env: {
    NODE_ENV: "production",
  },
};
```

You can see examples of these included in the built in type declarations in the `lib` field of `tsconfig.json`

# Recommended React + TypeScript codebases to learn from

- https://github.com/jaredpalmer/formik
- https://github.com/jaredpalmer/react-fns
- https://github.com/palantir/blueprint
- https://github.com/Shopify/polaris
- https://github.com/NullVoxPopuli/react-vs-ember/tree/master/testing/react
- https://github.com/artsy/reaction
- https://github.com/benawad/codeponder (with [coding livestream!](https://www.youtube.com/watch?v=D8IJOwdNSkc&list=PLN3n1USn4xlnI6kwzI8WrNgSdG4Z6daCq))
- https://github.com/artsy/emission (React Native)
- [@reach/ui's community typings](https://github.com/reach/reach-ui/pull/105)

React Boilerplates:

- https://github.com/rwieruch/nextjs-firebase-authentication: Next.js + Firebase Starter: styled, tested, typed, and authenticated
- [@jpavon/react-scripts-ts](https://github.com/jpavon/react-scripts-ts) alternative react-scripts with all TypeScript features using [ts-loader](https://github.com/TypeStrong/ts-loader)
- [webpack config tool](https://webpack.jakoblind.no/) is a visual tool for creating webpack projects with React and TypeScript
- <https://github.com/innFactory/create-react-app-material-typescript-redux> ready to go template with [Material-UI](https://material-ui.com/), routing and Redux

React Native Boilerplates: _contributed by [@spoeck](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/pull/20)_

- https://github.com/GeekyAnts/react-native-seed
- https://github.com/lopezjurip/ReactNativeTS
- https://github.com/emin93/react-native-template-typescript
- <https://github.com/Microsoft/TypeScript-React-Native-Starter>

# Editor Tooling and Integration

- VSCode
  - swyx's VSCode Extension: https://github.com/sw-yx/swyx-react-typescript-snippets
  - amVim: https://marketplace.visualstudio.com/items?itemName=auiworks.amvim
- VIM
  - https://github.com/Quramy/tsuquyomi
  - nvim-typescript?
  - https://github.com/leafgarland/typescript-vim
  - peitalin/vim-jsx-typescript
  - NeoVim: https://github.com/neoclide/coc.nvim
  - other discussion: https://mobile.twitter.com/ryanflorence/status/1085715595994095620

# Linting

> ⚠️Note that [TSLint is now in maintenance and you should try to use ESLint instead](https://medium.com/palantir/tslint-in-2019-1a144c2317a9). If you are interested in TSLint tips, please check this PR from [@azdanov](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/pull/14). The rest of this section just focuses on ESLint. [You can convert TSlint to ESlint with this tool](https://github.com/typescript-eslint/tslint-to-eslint-config).

> ⚠️This is an evolving topic. `typescript-eslint-parser` is no longer maintained and [work has recently begun on `typescript-eslint` in the ESLint community](https://eslint.org/blog/2019/01/future-typescript-eslint) to bring ESLint up to full parity and interop with TSLint.

Follow the TypeScript + ESLint docs at https://github.com/typescript-eslint/typescript-eslint:

```
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint
```

add a `lint` script to your `package.json`:

```json
  "scripts": {
    "lint": "eslint 'src/**/*.ts'"
  },
```

and a suitable `.eslintrc.js` (using `.js` over `.json` here so we can add comments):

```js
module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: "eslint:recommended",
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    "no-console": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
    "@typescript-eslint/explicit-function-return-type": "warn", // Consider using explicit annotations for object literals and function return types even when they can be inferred.
    "no-empty": "warn",
  },
};
```

Most of this is taken from [the `tsdx` PR](https://github.com/palmerhq/tsdx/pull/70/files) which is for **libraries**.

More `.eslintrc.json` options to consider with more options you may want for **apps**:

```json
{
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
    "plugin:unicorn/recommended"
  ],
  "plugins": ["prettier", "jest", "unicorn"],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "jest": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "overrides": [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "parser": "typescript-eslint-parser",
      "rules": {
        "no-undef": "off"
      }
    }
  ]
}
```

You can read a [fuller TypeScript + ESLint setup guide here](https://blog.matterhorn.dev/posts/learn-typescript-linting-part-1/) from Matterhorn, in particular check https://github.com/MatterhornDev/learn-typescript-linting.

Another great resource is ["Using ESLint and Prettier in a TypeScript Project"](https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb) by @robertcoopercode.

If you're looking for information on Prettier, check out the [Prettier](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/ADVANCED.md#prettier).

# Other React + TypeScript resources

- me! <https://twitter.com/swyx>
- <https://github.com/piotrwitek/react-redux-typescript-guide> - **HIGHLY HIGHLY RECOMMENDED**, i wrote this repo before knowing about this one, this has a lot of stuff I don't cover, including **REDUX** and **JEST**.
- [Ultimate React Component Patterns with TypeScript 2.8](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)
- [Basarat's TypeScript gitbook has a React section](https://basarat.gitbook.io/typescript/tsx/react) with an [Egghead.io course](https://egghead.io/courses/use-typescript-to-develop-react-applications) as well.
- [Palmer Group's TypeScript + React Guidelines](https://github.com/palmerhq/typescript) as well as Jared's other work like [disco.chat](https://github.com/jaredpalmer/disco.chat)
- [Stefan Baumgartner's TypeScript + React Guide](https://fettblog.eu/typescript-react), which serves as a side-by-side guide to the official docs with extra articles on styling, custom hooks and patterns
- [Sindre Sorhus' TypeScript Style Guide](https://github.com/sindresorhus/typescript-definition-style-guide)
- [TypeScript React Starter Template by Microsoft](https://github.com/Microsoft/TypeScript-React-Starter) A starter template for TypeScript and React with a detailed README describing how to use the two together. Note: this doesnt seem to be frequently updated anymore.
- [Brian Holt's Intermediate React course on Frontend Masters (paid)](https://frontendmasters.com/courses/intermediate-react/converting-the-app-to-typescript/) - Converting App To TypeScript Section
- TypeScript conversion:
  - [Lyft's React-To-TypeScript conversion CLI](https://github.com/lyft/react-javascript-to-typescript-transform)
  - [Gustav Wengel's blogpost - converting a React codebase to TypeScript](http://www.gustavwengel.dk/converting-typescript-to-javascript-part-1)
  - [Microsoft React TypeScript conversion guide](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide)
- [You?](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).

# Recommended React + TypeScript talks

- [Ultimate React Component Patterns with TypeScript](https://www.youtube.com/watch?v=_PBQ3if6Fmg), by Martin Hochel, GeeCon Prague 2018
- Please help contribute this new section!

# Time to Really Learn TypeScript

Believe it or not, we have only barely introduced TypeScript here in this cheatsheet. There is a whole world of generic type logic that you will eventually get into, however it becomes far less dealing with React than just getting good at TypeScript so it is out of scope here. But at least you can get productive in React now :)

It is worth mentioning some resources to help you get started:

- Step through the 40+ examples under [the playground's](http://www.typescriptlang.org/play/index.html) Examples section, written by @Orta
- Anders Hejlsberg's overview of TS: https://www.youtube.com/watch?v=ET4kT88JRXs
- Marius Schultz: https://blog.mariusschulz.com/series/typescript-evolution with an [Egghead.io course](https://egghead.io/courses/advanced-static-types-in-typescript)
- Basarat's Deep Dive: https://basarat.gitbook.io/typescript/
- Rares Matei: [Egghead.io course](https://egghead.io/courses/practical-advanced-typescript)'s advanced TypeScript course on Egghead.io is great for newer typescript features and practical type logic applications (e.g. recursively making all properties of a type `readonly`)
- Shu Uesugi: [TypeScript for Beginner Programmers](https://ts.chibicode.com/)

# Example App

- [Create React App TypeScript Todo Example 2020](https://github.com/laststance/create-react-app-typescript-todo-example-2020)

# My question isn't answered here!

- [File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).

## Contributors

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. See [CONTRIBUTORS.md](/CONTRIBUTORS.md) for the full list. Contributions of any kind welcome!
