---
id: patterns_by_version
title: "Useful Patterns by TypeScript Version"
sidebar_label: Useful Patterns by TypeScript Version
---

TypeScript Versions often introduce new ways to do things; this section helps current users of React + TypeScript upgrade TypeScript versions and explore patterns commonly used by TypeScript + React apps and libraries. This may have duplications with other sections; if you spot any discrepancies, [file an issue](https://github.com/typescript-cheatsheets/react/issues/new)!

_TypeScript version guides before 2.9 are unwritten, please feel free to send a PR!_ Apart from official TS team communication we also recommend [Marius Schulz's blog for version notes](https://mariusschulz.com/). For more TypeScript history, see [A Brief History of TypeScript Types](https://github.com/blakeembrey/a-brief-history-of-types-with-typescript) and [A Brief History of DefinitelyTyped](https://blog.johnnyreilly.com/2019/10/definitely-typed-movie.html). You may also wish to explore lesser known alternative typings of React like [prop-types](https://reactjs.org/docs/typechecking-with-proptypes.html), [om](https://github.com/omcljs/om), [reason-react](https://reasonml.github.io/reason-react/), and [typed-react](https://github.com/asana/typed-react).

## TypeScript 2.9

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/2018/05/31/announcing-typescript-2-9/)]

1. Type arguments for tagged template strings (e.g. `styled-components`):

```tsx
export interface InputFormProps {
  foo: string; // this is understood inside the template string below
}

export const InputForm = styledInput<InputFormProps>`
    color:
        ${({ themeName }) => (themeName === "dark" ? "black" : "white")};
    border-color: ${({ foo }) => (foo ? "red" : "black")};
`;
```

2. **JSX Generics**

https://github.com/Microsoft/TypeScript/pull/22415

Helps with typing/using generic components:

```tsx
// instead of
<Formik
  render={(props: FormikProps<Values>) => {
    /* your code here ... */
  }}
/>;

// usage
<Formik<Values>
  render={(props) => {
    /* your code here ... */
  }}
/>;
<MyComponent<number> data={12} />;
```

More info: https://github.com/basarat/typescript-book/blob/master/docs/jsx/react.md#react-jsx-tip-generic-components

## TypeScript 3.0

[[Release Notes](https://github.com/Microsoft/TypeScript/releases/tag/v3.0.1) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/2018/07/30/announcing-typescript-3-0/)]

1. Typed rest parameters for writing arguments of variable length:

```ts
// `rest` accepts any number of strings - even none!
function foo(...rest: string[]) {
  // ...
}

foo("hello"); // works
foo("hello", "world"); // also works
```

2. Support for `propTypes` and `static defaultProps` in JSX using `LibraryManagedAttributes`:

```tsx
export interface Props {
  name: string;
}

export class Greet extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return <div>Hello ${name.toUpperCase()}!</div>;
  }
  static defaultProps = { name: "world" };
}

// Type-checks! No type assertions needed!
let el = <Greet />;
```

3. new `Unknown` type

For typing API's to force type checks - not specifically React related, however very handy for dealing with API responses:

```tsx
interface IComment {
  date: Date;
  message: string;
}

interface IDataService1 {
  getData(): any;
}

let service1: IDataService1;
const response = service1.getData();
response.a.b.c.d; // RUNTIME ERROR

// ----- compare with -------

interface IDataService2 {
  getData(): unknown; // ooo
}

let service2: IDataService2;
const response2 = service2.getData();
// response2.a.b.c.d; // COMPILE TIME ERROR if you do this

if (typeof response === "string") {
  console.log(response.toUpperCase()); // `response` now has type 'string'
}
```

TODO: blame this change. Don't know what this should've done

You can also assert a type, or use a **type guard** against an `unknown` type. This is better than resorting to `any`.

4. Project References

Project references allow TypeScript projects to depend on other TypeScript projects – specifically, allowing tsconfig.json files to reference other tsconfig.json files. This lets large codebases scale without recompiling every part of the codebase every time, by breaking it up into multiple projects.

In each folder, create a tsconfig.json that includes at least:

```json
{
  "compilerOptions": {
    "composite": true, // tells TSC it is a subproject of a larger project
    "declaration": true, // emit .d.ts declaration files since project references dont have access to source ts files. important for project references to work!
    "declarationMap": true, // sourcemaps for .d.ts
    "rootDir": "." // specify compile it relative to root project at .
  },
  "include": ["./**/*.ts"],
  "references": [
    // (optional) array of subprojects your subproject depends on
    {
      "path": "../myreferencedproject", // must have tsconfig.json
      "prepend": true // concatenate js and sourcemaps generated by this subproject, if and only if using outFile
    }
  ]
}
```

and the root `tsconfig.json` that references top level subproject:

```json
{
  "files": [],
  "references": [{ "path": "./proj1" }, { "path": "./proj2" }]
}
```

and you must run `tsc --build` or `tsc -b`.

To save the tsconfig boilerplate, you can use the `extends` option:

```json
{
  "extends": "../tsconfig.base"
  // more stuff here
}
```

## TypeScript 3.1

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-1.html) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/announcing-typescript-3-1/)]

1. Properties declarations on functions

Attaching properties to functions like this "just works" now:

```tsx
export const FooComponent = ({ name }) => <div>Hello! I am {name}</div>;

FooComponent.defaultProps = {
  name: "swyx",
};
```

## TypeScript 3.2

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/2018/11/29/announcing-typescript-3-2/)]

nothing specifically React related.

## TypeScript 3.3

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-3.html) | [Blog Post](https://blogs.msdn.microsoft.com/typescript/2019/01/31/announcing-typescript-3-3/)]

nothing specifically React related.

## TypeScript 3.4

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html) | [Blog Post](https://devblogs.microsoft.com/typescript/announcing-typescript-3-4)]

1. [`const` assertions](https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/#const-assertions)

```tsx
function useLoading() {
  const [isLoading, setState] = useState(false);

  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };

  return [isLoading, load] as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}
```

More info on places you can use [const assertions](https://blog.logrocket.com/const-assertions-are-the-killer-new-typescript-feature-b73451f35802).

## TypeScript 3.5

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-5.html) | [Blog Post](https://devblogs.microsoft.com/typescript/announcing-typescript-3-5/)]

1. Built-in `<Omit>` Type!!

2. Higher order type inference from generic constructors

```tsx
type ComponentClass<P> = new (props: P) => Component<P>;
declare class Component<P> {
  props: P;
  constructor(props: P);
}

declare function myHoc<P>(C: ComponentClass<P>): ComponentClass<P>;

type NestedProps<T> = { foo: number; stuff: T };

declare class GenericComponent<T> extends Component<NestedProps<T>> {}

// type is 'new <T>(props: NestedProps<T>) => Component<NestedProps<T>>'
const GenericComponent2 = myHoc(GenericComponent);
```

See also [Notes from Google upgrading to 3.5](https://github.com/microsoft/TypeScript/issues/33272)

## TypeScript 3.6

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-6.html) | [Blog Post](https://devblogs.microsoft.com/typescript/announcing-typescript-3-6/)]

Nothing particularly React specific but [the playground](https://github.com/agentcooper/typescript-play) got an upgrade and [Ambient Classes and Functions Can Merge](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-6.html#ambient-classes-and-functions-can-merge)

## TypeScript 3.7

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html) | [Blog Post](https://devblogs.microsoft.com/typescript/announcing-typescript-3-7/)]

1. Optional Chaining

```ts
let x = foo?.bar.baz();

// is equivalent to

let x = foo === null || foo === undefined ? undefined : foo.bar.baz();

// Optional Element access
function tryGetFirstElement<T>(arr?: T[]) {
  return arr?.[0];
}

// Optional Call
async function makeRequest(url: string, log?: (msg: string) => void) {
  log?.(`Request started at ${new Date().toISOString()}`);
  const result = (await fetch(url)).json();
  log?.(`Request finished at at ${new Date().toISOString()}`);
  return result;
}
```

2. Nullish Coalescing

```ts
let x = foo ?? bar();

// equivalent to

let x = foo !== null && foo !== undefined ? foo : bar();
```

**YOU SHOULD USUALLY USE `??` WHEREVER YOU NORMALLY USE `||`** unless you truly mean falsiness:

```tsx
function ShowNumber({ value }: { value: number }) {
  let _value = value || 0.5; // will replace 0 with 0.5 even if user really means 0
  // etc...
}
```

3. Assertion Functions

```tsx
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new AssertionError(msg);
  }
}
function yell(str) {
  assert(typeof str === "string");

  return str.toUppercase();
  //         ~~~~~~~~~~~
  // error: Property 'toUppercase' does not exist on type 'string'.
  //        Did you mean 'toUpperCase'?
}
```

You can also assert without a custom function:

```tsx
function assertIsString(val: any): asserts val is string {
  if (typeof val !== "string") {
    throw new AssertionError("Not a string!");
  }
}
function yell(str: any) {
  assertIsString(str);

  // Now TypeScript knows that 'str' is a 'string'.

  return str.toUppercase();
  //         ~~~~~~~~~~~
  // error: Property 'toUppercase' does not exist on type 'string'.
  //        Did you mean 'toUpperCase'?
}
```

4. `ts-nocheck`

You can now add `// @ts-nocheck` to the top of TypeScript files! good for migrations.

## TypeScript 3.8

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html) | [Blog Post](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8/)]

1. Type-Only Imports and Exports

```ts
import type { SomeThing } from "./some-module.js";

export type { SomeThing };
```

2. ECMAScript Private Fields

Not really React specific but ok Bloomberg

3. `export * as ns` Syntax

This is ES2020 syntax. Instead of

```js
import * as utilities from "./utilities.js";
export { utilities };
```

you can do

```js
export * as utilities from "./utilities.js";
```

4. Top-Level `await`

not React specific but gj Myles

5. JSDoc Property Modifiers

handy for JSDoc users - `@public, @private, @protected, @readonly`

6. Better Directory Watching on Linux and watchOptions
7. “Fast and Loose” Incremental Checking

`assumeChangesOnlyAffectDirectDependencies` reduces build times for extremely large codebases.

## TypeScript 3.9

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html) | [Blog Post](https://devblogs.microsoft.com/typescript/announcing-typescript-3-9/)]

1. (minor feature) New `ts-expect-error` directive.

Use this when writing tests you expect to error.

```ts
// @ts-expect-error
console.log(47 * "octopus");
```

Pick `ts-expect-error` if:

- you’re writing test code where you actually want the type system to error on an operation
- you expect a fix to be coming in fairly quickly and you just need a quick workaround
- you’re in a reasonably-sized project with a proactive team that wants to remove suppression comments as soon affected code is valid again

Pick `ts-ignore` if:

- you have an a larger project and and new errors have appeared in code with no clear owner
- you are in the middle of an upgrade between two different versions of TypeScript, and a line of code errors in one version but not another.
- you honestly don’t have the time to decide which of these options is better.

2. `}` and `>` are Now Invalid JSX Text Characters

They were always invalid, but now TypeScript and Babel are enforcing it:

```
Unexpected token. Did you mean `{'>'}` or `&gt;`?
Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
```

You can [convert these in bulk](https://github.com/microsoft/TypeScript/pull/37436) if needed.

## TypeScript 4.0

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html) | [Blog Post](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/)]

- [Variadic Tuple Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0-beta/#variadic-tuple-types)

  - useful for [simplified Reducer-like State](https://www.reddit.com/r/reactjs/comments/hu0ytg/simplified_reducerlike_state_using_typescript_40/)

- [Custom JSX Factories](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/#custom-jsx-factories)

It's for custom pragmas with Preact

```tsx
// Note: these pragma comments need to be written
// with a JSDoc-style multiline syntax to take effect.
/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment } from "preact";

let stuff = (
  <>
    <div>Hello</div>
  </>
);
// transformed to
let stuff = h(Fragment, null, h("div", null, "Hello"));
```

## TypeScript 4.1

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html) | [Blog Post](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/)]

1. Template Literal Types

This is a HUGE feature.

Usecase 1 - Generating string literal types from permutations of other string literal types:

```tsx
type VerticalAlignment = "top" | "middle" | "bottom";
type HorizontalAlignment = "left" | "center" | "right";

// Takes
//   | "top-left"    | "top-center"    | "top-right"
//   | "middle-left" | "middle-center" | "middle-right"
//   | "bottom-left" | "bottom-center" | "bottom-right"
declare function setAlignment(
  value: `${VerticalAlignment}-${HorizontalAlignment}`
): void;

setAlignment("top-left"); // works!
setAlignment("top-middel"); // error!
setAlignment("top-pot"); // error! but good doughnuts if you're ever in Seattle
```

Usecase 2 - Modeling dynaming string literal types:

```tsx
type PropEventSource<T> = {
  on(eventName: `${string & keyof T}Changed`, callback: () => void): void;
};

/// Create a "watched object" with an 'on' method
/// so that you can watch for changes to properties.
declare function makeWatchedObject<T>(obj: T): T & PropEventSource<T>;
```

To make string manipulation easier there are new generics: `Uppercase`, `Lowercase`, `Capitalize` and `Uncapitalize`.

You can combine it with the `infer` keyword [like this](https://www.smashingmagazine.com/2021/01/dynamic-static-typing-typescript/#conditional-types-and-recursive-template-literal-types):

```ts
type ParseRouteParams<Rte> = Rte extends `${string}/:${infer P}` ? P : never;

type Params = ParseRouteParams<"/api/user/:userID">; // Params is "userID"

type NoParams = ParseRouteParams<"/api/user">; // NoParams is never --> no params!
```

This feature is extremely flexible, see other usecase ideas here:

- https://hasura.io/blog/how-typescript-template-literal-types-helped-us-with-multiple-database-support/
- https://github.com/ghoullier/awesome-template-literal-types

2. [React 17 jsx Factories](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#react-17-jsx-factories)

This is a new compiler option to offer output inline with React 17 support in general:

```jsx
// ./src/tsconfig.json - for production
{
    "compilerOptions": {
        "module": "esnext",
        "target": "es2015",
        "jsx": "react-jsx",
        "strict": true
    },
    "include": [
        "./**/*"
    ]
}

// ./src/tsconfig.dev.json - for development - extending the production config
{
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "jsx": "react-jsxdev"
    }
}
```

Misc

2. [Key Remapping in Mapped Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#key-remapping-in-mapped-types)
3. [Recursive Conditional Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types)
4. [Checked Indexed Accesses](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#checked-indexed-accesses-nouncheckedindexedaccess)

## TypeScript 4.2

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-2.html) | [Blog Post](https://devblogs.microsoft.com/typescript/announcing-typescript-4-2/)]

nothing react specific

## TypeScript 4.3

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html) | [Blog Post](https://devblogs.microsoft.com/typescript/announcing-typescript-4-3/)]

nothing react specific

## TypeScript 4.4

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-4.html) | [Blog Post](https://devblogs.microsoft.com/typescript/announcing-typescript-4-4/)]

nothing react specific

## TypeScript 4.5

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html) | [Blog Post](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5/)]

1. (minor VSCode improvement) Snippet Completions for JSX Attributes

## TypeScript 4.6

[[Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-6.html) | [Blog Post](https://devblogs.microsoft.com/typescript/announcing-typescript-4-6/)]

1. (extremely minor) Removed Unnecessary Arguments in `react-jsx` compile output

## TypeScript Roadmap and Spec

https://github.com/Microsoft/TypeScript/wiki/Roadmap

Did you also know you can read the TypeScript spec online?? https://github.com/microsoft/TypeScript/blob/master/doc/spec-ARCHIVED.md
