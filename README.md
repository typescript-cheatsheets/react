# React+TypeScript Cheatsheets

Cheatsheets for experienced React developers getting started with TypeScript

---

<a href="https://github.com/typescript-cheatsheets/react/issues/81">
  <img
    height="90"
    width="90"
    alt="react + ts logo"
    src="https://user-images.githubusercontent.com/84442212/194379444-02e5ec69-5e6c-4100-bd7a-c31d628af29c.png"
    align="left"
  />
</a>

[**Web docs**](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup) |
[**Español**](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet-es) |
[**Português**](https://github.com/typescript-cheatsheets/react-pt) |
[Contribute!](https://github.com/typescript-cheatsheets/react/blob/main/CONTRIBUTING.md) |
[Ask!](https://github.com/typescript-cheatsheets/react/issues/new/choose)

:wave: This repo is maintained by [@swyx](https://twitter.com/swyx), [@eps1lon](https://twitter.com/sebsilbermann) and [@filiptammergard](https://twitter.com/tammergard). We're so happy you want to try out TypeScript with React! If you see anything wrong or missing, please [file an issue](https://github.com/typescript-cheatsheets/react/issues/new/choose)! :+1:

---

[![All Contributors](https://img.shields.io/github/contributors/typescript-cheatsheets/react-typescript-cheatsheet?color=orange&style=flat-square)](/CONTRIBUTORS.md) | [![Discord](https://img.shields.io/discord/508357248330760243.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/wTGS5z9) | [![Tweet](https://img.shields.io/twitter/url?label=Help%20spread%20the%20word%21&style=social&url=https%3A%2F%2Fgithub.com%2Ftypescript-cheatsheets%2Freact)](http://twitter.com/home?status=Awesome%20%40Reactjs%20%2B%20%40TypeScript%20cheatsheet%20by%20%40ferdaber%2C%20%40sebsilbermann%2C%20%40swyx%20%26%20others!%20https%3A%2F%2Fgithub.com%2Ftypescript-cheatsheets%2Freact)

## All React + TypeScript Cheatsheets

- [The Basic Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup) is focused on helping React devs just start using TS in React **apps**
  - Focus on opinionated best practices, copy+pastable examples.
  - Explains some basic TS types usage and setup along the way.
  - Answers the most Frequently Asked Questions.
  - Does not cover generic type logic in detail. Instead we prefer to teach simple troubleshooting techniques for newbies.
  - The goal is to get effective with TS without learning _too much_ TS.
- [The Advanced Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/advanced) helps show and explain advanced usage of generic types for people writing reusable type utilities/functions/render prop/higher order components and TS+React **libraries**.
  - It also has miscellaneous tips and tricks for pro users.
  - Advice for contributing to DefinitelyTyped.
  - The goal is to take _full advantage_ of TypeScript.
- [The Migrating Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/migration) helps collate advice for incrementally migrating large codebases from JS or Flow, **from people who have done it**.
  - We do not try to convince people to switch, only to help people who have already decided.
  - ⚠️This is a new cheatsheet, all assistance is welcome.
- [The HOC Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/hoc)) specifically teaches people to write HOCs with examples.
  - Familiarity with [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) is necessary.
  - ⚠️This is the newest cheatsheet, all assistance is welcome.

---

## Basic Cheatsheet

### Basic Cheatsheet Table of Contents

<details>

<summary><b>Expand Table of Contents</b></summary>

- [Section 1: Setup TypeScript with React](#section-1-setup-typescript-with-react)
  <!--START-SECTION:setup-toc-->
  - [Prerequisites](#prerequisites)
  - [React and TypeScript starter kits](#react-and-typescript-starter-kits)
  - [Try React and TypeScript online](#try-react-and-typescript-online)<!--END-SECTION:setup-toc-->
- [Section 2: Getting Started](#section-2-getting-started)
  - [Function Components](#function-components)
  - [Hooks](#hooks)
  - [useState](#usestate)
  - [useReducer](#usereducer)
  - [useEffect / useLayoutEffect](#useeffect--uselayouteffect)
  - [useRef](#useref)
    - [Option 1: DOM element ref](#option-1-dom-element-ref)
    - [Option 2: Mutable value ref](#option-2-mutable-value-ref)
    - [See also](#see-also)
  - [useImperativeHandle](#useimperativehandle)
  - [Custom Hooks](#custom-hooks)
  - [More Hooks + TypeScript reading:](#more-hooks--typescript-reading)
  - [Example React Hooks + TypeScript Libraries:](#example-react-hooks--typescript-libraries)
  - [Class Components](#class-components)
  - [Typing getDerivedStateFromProps](#typing-getderivedstatefromprops)
  - [You May Not Need `defaultProps`](#you-may-not-need-defaultprops)
  - [Typing `defaultProps`](#typing-defaultprops)
  - [Consuming Props of a Component with defaultProps](#consuming-props-of-a-component-with-defaultprops)
    - [Problem Statement](#problem-statement)
    - [Solution](#solution)
  - [Misc Discussions and Knowledge](#misc-discussions-and-knowledge)
  - [Typing Component Props](#typing-component-props)
  - [Basic Prop Types Examples](#basic-prop-types-examples)
  - [Useful React Prop Type Examples](#useful-react-prop-type-examples)
  - [Types or Interfaces?](#types-or-interfaces)
    - [TL;DR](#tldr)
    - [More Advice](#more-advice)
    - [Useful table for Types vs Interfaces](#useful-table-for-types-vs-interfaces)
- [getDerivedStateFromProps](#getderivedstatefromprops)
- [Forms and Events](#forms-and-events)
- [List of event types](#list-of-event-types)
- [Context](#context)
- [Basic Example](#basic-example)
- [Extended Example](#extended-example)
- [forwardRef/createRef](#forwardrefcreateref)
- [Generic forwardRefs](#generic-forwardrefs)
- [Option 1 - Wrapper component](#option-1---wrapper-component)
- [Option 2 - Redeclare forwardRef](#option-2---redeclare-forwardref)
- [More Info](#more-info)
- [Portals](#portals)
- [Error Boundaries](#error-boundaries)
- [Option 1: Using react-error-boundary](#option-1-using-react-error-boundary)
- [Options 2: Writing your custom error boundary component](#options-2-writing-your-custom-error-boundary-component)
- [Concurrent React/React Suspense](#concurrent-reactreact-suspense)
- [Troubleshooting Handbook: Types](#troubleshooting-handbook-types)
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
  - [The Types I need weren't exported!](#the-types-i-need-werent-exported)
  - [The Types I need don't exist!](#the-types-i-need-dont-exist)
    - [Slapping `any` on everything](#slapping-any-on-everything)
    - [Autogenerate types](#autogenerate-types)
    - [Typing Exported Hooks](#typing-exported-hooks)
    - [Typing Exported Components](#typing-exported-components)
  - [Frequent Known Problems with TypeScript](#frequent-known-problems-with-typescript)
    - [TypeScript doesn't narrow after an object element null check](#typescript-doesnt-narrow-after-an-object-element-null-check)
    - [TypeScript doesn't let you restrict the type of children](#typescript-doesnt-let-you-restrict-the-type-of-children)<!--END-SECTION:types-toc-->
- [Troubleshooting Handbook: Operators](#troubleshooting-handbook-operators)
- [Troubleshooting Handbook: Utilities](#troubleshooting-handbook-utilities)
- [Troubleshooting Handbook: tsconfig.json](#troubleshooting-handbook-tsconfigjson)
- [Troubleshooting Handbook: Fixing bugs in official typings](#troubleshooting-handbook-fixing-bugs-in-official-typings)
- [Troubleshooting Handbook: Globals, Images and other non-TS files](#troubleshooting-handbook-globals-images-and-other-non-ts-files)
- [Editor Tooling and Integration](#editor-tooling-and-integration)
- [Linting](#linting)
- [Other React + TypeScript resources](#other-react--typescript-resources)
- [Recommended React + TypeScript talks](#recommended-react--typescript-talks)
- [Time to Really Learn TypeScript](#time-to-really-learn-typescript)
- [Example App](#example-app)

    </details>

<!--START-SECTION:setup-->

### Section 1: Setup

#### Prerequisites

You can use this cheatsheet for reference at any skill level, but basic understanding of React and TypeScript is assumed. Here is a list of prerequisites:

- Basic understanding of [React](https://react.dev/).
- Familiarity with [TypeScript Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) and [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).

In the cheatsheet we assume you are using the latest versions of React and TypeScript.

#### React and TypeScript starter kits

React has documentation for [how to start a new React project](https://react.dev/learn/start-a-new-react-project) with some of the most popular frameworks. Here's how to start them with TypeScript:

- [Next.js](https://nextjs.org/docs/basic-features/typescript): `npx create-next-app@latest --ts`
- [Remix](https://remix.run/docs/tutorials/blog): `npx create-remix@latest`
- [Gatsby](https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/): `npm init gatsby --ts`
- [Expo](https://docs.expo.dev/guides/typescript/): `npx create-expo-app -t with-typescript`

#### Try React and TypeScript online

There are some tools that let you run React and TypeScript online, which can be helpful for debugging or making sharable reproductions.

- [TypeScript playground](https://www.typescriptlang.org/play?target=8&jsx=4#code/JYWwDg9gTgLgBAbzgVwM4FMDKMCGN0A0KGAogGZnoDG8AvnGVBCHAORTo42sDcAsAChB6AB6RYcKhAB2qeAGEIyafihwAvHAAUASg0A+RILiSZcuAG0pymEQwxFNgLobiWXPi0AGHfyECTNHRyShotXQMjAJM4ABMIKmQQdBUAOhhgGAAbdFcAAwBNJUks4CoAa3RYuAASBGsVegzk1Dy-E1pfQWM4DhhkKGltHpMAHn0RmNGwfSLkErLK6vqlRrhm9FRRgHoZybGAI2QYGBk4GXlSivUECPVDe0cVLQb4AGo4AEYdWgnomJil0WcGS+zgOyOJxkfwBOxhcC6AlogiAA)
- [StackBlitz](https://stackblitz.com/fork/react-ts)
- [CodeSandbox](https://ts.react.new/)

<!--END-SECTION:setup-->

### Section 2: Getting Started

<!--START-SECTION:function-components-->

#### Function Components

These can be written as normal functions that take a `props` argument and return a JSX element.

```tsx
// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = {
  message: string;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const App = ({ message }: AppProps) => <div>{message}</div>;

// you can choose annotate the return type so an error is raised if you accidentally return some other type
const App = ({ message }: AppProps): React.JSX.Element => <div>{message}</div>;

// you can also inline the type declaration; eliminates naming the prop types, but looks repetitive
const App = ({ message }: { message: string }) => <div>{message}</div>;

// Alternatively, you can use `React.FunctionComponent` (or `React.FC`), if you prefer.
// With latest React types and TypeScript 5.1. it's mostly a stylistic choice, otherwise discouraged.
const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
  <div>{message}</div>
);
```

> Tip: You might use [Paul Shen's VS Code Extension](https://marketplace.visualstudio.com/items?itemName=paulshen.paul-typescript-toolkit) to automate the type destructure declaration (incl a [keyboard shortcut](https://twitter.com/_paulshen/status/1392915279466745857?s=20)).

<details>

<summary><b>Why is <code>React.FC</code> not needed? What about <code>React.FunctionComponent</code>/<code>React.VoidFunctionComponent</code>?</b></summary>

You may see this in many React+TypeScript codebases:

```tsx
const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
  <div>{message}</div>
);
```

However, the general consensus today is that `React.FunctionComponent` (or the shorthand `React.FC`) is not needed. If you're still using React 17 or TypeScript lower than 5.1, it is even [discouraged](https://github.com/facebook/create-react-app/pull/8177). This is a nuanced opinion of course, but if you agree and want to remove `React.FC` from your codebase, you can use [this jscodeshift codemod](https://github.com/gndelia/codemod-replace-react-fc-typescript).

Some differences from the "normal function" version:

- `React.FunctionComponent` is explicit about the return type, while the normal function version is implicit (or else needs additional annotation).

- It provides typechecking and autocomplete for static properties like `displayName`, `propTypes`, and `defaultProps`.

  - Note that there are some known issues using `defaultProps` with `React.FunctionComponent`. See [this issue for details](https://github.com/typescript-cheatsheets/react/issues/87). We maintain a separate `defaultProps` section you can also look up.

- Before the [React 18 type updates](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210), `React.FunctionComponent` provided an implicit definition of `children` (see below), which was heavily debated and is one of the reasons [`React.FC` was removed from the Create React App TypeScript template](https://github.com/facebook/create-react-app/pull/8177).

```tsx
// before React 18 types
const Title: React.FunctionComponent<{ title: string }> = ({
  children,
  title,
}) => <div title={title}>{children}</div>;
```

<details>
<summary>(Deprecated)<b>Using <code>React.VoidFunctionComponent</code> or <code>React.VFC</code> instead</b></summary>

In [@types/react 16.9.48](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/46643), the `React.VoidFunctionComponent` or `React.VFC` type was added for typing `children` explicitly.
However, please be aware that `React.VFC` and `React.VoidFunctionComponent` were deprecated in React 18 (https://github.com/DefinitelyTyped/DefinitelyTyped/pull/59882), so this interim solution is no longer necessary or recommended in React 18+.

Please use regular function components or `React.FC` instead.

```ts
type Props = { foo: string };

// OK now, in future, error
const FunctionComponent: React.FunctionComponent<Props> = ({
  foo,
  children,
}: Props) => {
  return (
    <div>
      {foo} {children}
    </div>
  ); // OK
};

// Error now, in future, deprecated
const VoidFunctionComponent: React.VoidFunctionComponent<Props> = ({
  foo,
  children,
}) => {
  return (
    <div>
      {foo}
      {children}
    </div>
  );
};
```

</details>

- _In the future_, it may automatically mark props as `readonly`, though that's a moot point if the props object is destructured in the parameter list.

In most cases it makes very little difference which syntax is used, but you may prefer the more explicit nature of `React.FunctionComponent`.

</details>

<!--END-SECTION:function-components-->

<!--START-SECTION:hooks-->

#### Hooks

Hooks are [supported in `@types/react` from v16.8 up](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L800-L1031).

#### useState

Type inference works very well for simple values:

```tsx
const [state, setState] = useState(false);
// `state` is inferred to be a boolean
// `setState` only takes booleans
```

See also the [Using Inferred Types](https://react-typescript-cheatsheet.netlify.app/docs/basic/troubleshooting/types/#using-inferred-types) section if you need to use a complex type that you've relied on inference for.

However, many hooks are initialized with null-ish default values, and you may wonder how to provide types. Explicitly declare the type, and use a union type:

```tsx
const [user, setUser] = useState<User | null>(null);

// later...
setUser(newUser);
```

You can also use type assertions if a state is initialized soon after setup and always has a value after:

```tsx
const [user, setUser] = useState<User>({} as User);

// later...
setUser(newUser);
```

This temporarily "lies" to the TypeScript compiler that `{}` is of type `User`. You should follow up by setting the `user` state — if you don't, the rest of your code may rely on the fact that `user` is of type `User` and that may lead to runtime errors.

#### useCallback

You can type the `useCallback` just like any other function.

```ts
const memoizedCallback = useCallback(
  (param1: string, param2: number) => {
    console.log(param1, param2)
    return { ok: true }
  },
  [...],
);
/**
 * VSCode will show the following type:
 * const memoizedCallback:
 *  (param1: string, param2: number) => { ok: boolean }
 */
```

Note that for React < 18, the function signature of `useCallback` typed arguments as `any[]` by default:

```ts
function useCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList
): T;
```

In React >= 18, the function signature of `useCallback` changed to the following:

```ts
function useCallback<T extends Function>(callback: T, deps: DependencyList): T;
```

Therefore, the following code will yield "`Parameter 'e' implicitly has an 'any' type.`" error in React >= 18, but not <17.

```ts
// @ts-expect-error Parameter 'e' implicitly has 'any' type.
useCallback((e) => {}, []);
// Explicit 'any' type.
useCallback((e: any) => {}, []);
```

#### useReducer

You can use [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) for reducer actions. Don't forget to define the return type of reducer, otherwise TypeScript will infer it.

```tsx
import { useReducer } from "react";

const initialState = { count: 0 };

type ACTIONTYPE =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: string };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - Number(action.payload) };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement", payload: "5" })}>
        -
      </button>
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        +
      </button>
    </>
  );
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play?#code/LAKFEsFsAcHsCcAuACAVMghgZ2QJQKYYDGKAZvLJMgOTyEnUDcooRsAdliuO+IuBgA2AZUQZE+ZAF5kAbzYBXdogBcyAAwBfZmBCIAntEkBBAMIAVAJIB5AHLmAmgAUAotOShkyAD5zkBozVqHiI6SHxlagAaZGgMfUFYDAATNXYFSAAjfHhNDxAvX1l-Q3wg5PxQ-HDImLiEpNTkLngeAHM8ll1SJRJwDmQ6ZIUiHIAKLnEykqNYUmQePgERMQkY4n4ONTMrO0dXAEo5T2aAdz4iAAtkMY3+9gA6APwj2ROvImxJYPYqmsRqCp3l5BvhEAp4Ow5IplGpJhIHjCUABqTB9DgPeqJFLaYGfLDfCp-CIAoEFEFeOjgyHQ2BKVTNVb4RF05TIAC0yFsGWy8Fu6MeWMaB1x5K8FVIGAUglUwK8iEuFFOyHY+GVLngFD5Bx0Xk0oH13V6myhplZEm1x3JbE4KAA2vD8DFkuAsHFEFcALruAgbB4KAkEYajPlDEY5GKLfhCURTHUnKkQqFjYEAHgAfHLkGb6WpZI6WfTDRSvKnMgpEIgBhxTIJwEQANZSWRjI5SdPIF1u8RXMayZ7lSphEnRWLxbFNagAVmomhF6fZqYA9OXKxxM2KQWWK1WoTW643m63pB2u+7e-3SkEQsPamOGik1FO55p08jl6vdxuKcvv8h4yAmhAA)

<details>

<summary><b>Usage with <code>Reducer</code> from <code>redux</code></b></summary>

In case you use the [redux](https://github.com/reduxjs/redux) library to write reducer function, It provides a convenient helper of the format `Reducer<State, Action>` which takes care of the return type for you.

So the above reducer example becomes:

```tsx
import { Reducer } from 'redux';

export function reducer: Reducer<AppState, Action>() {}
```

</details>

#### useEffect / useLayoutEffect

Both of `useEffect` and `useLayoutEffect` are used for performing <b>side effects</b> and return an optional cleanup function which means if they don't deal with returning values, no types are necessary. When using `useEffect`, take care not to return anything other than a function or `undefined`, otherwise both TypeScript and React will yell at you. This can be subtle when using arrow functions:

```ts
function DelayedEffect(props: { timerMs: number }) {
  const { timerMs } = props;

  useEffect(
    () =>
      setTimeout(() => {
        /* do stuff */
      }, timerMs),
    [timerMs]
  );
  // bad example! setTimeout implicitly returns a number
  // because the arrow function body isn't wrapped in curly braces
  return null;
}
```

<details>
<summary><b>Solution to the above example</b></summary>

```tsx
function DelayedEffect(props: { timerMs: number }) {
  const { timerMs } = props;

  useEffect(() => {
    setTimeout(() => {
      /* do stuff */
    }, timerMs);
  }, [timerMs]);
  // better; use the void keyword to make sure you return undefined
  return null;
}
```

</details>

#### useRef

In TypeScript, `useRef` returns a reference that is either [read-only](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/abd69803c1b710db58d511f4544ec1b70bc9077c/types/react/v16/index.d.ts#L1025-L1039) or [mutable](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/abd69803c1b710db58d511f4544ec1b70bc9077c/types/react/v16/index.d.ts#L1012-L1023), depends on whether your type argument fully covers the initial value or not. Choose one that suits your use case.

##### Option 1: DOM element ref

**[To access a DOM element](https://reactjs.org/docs/refs-and-the-dom.html):** provide only the element type as argument, and use `null` as initial value. In this case, the returned reference will have a read-only `.current` that is managed by React. TypeScript expects you to give this ref to an element's `ref` prop:

```tsx
function Foo() {
  // - If possible, prefer as specific as possible. For example, HTMLDivElement
  //   is better than HTMLElement and way better than Element.
  // - Technical-wise, this returns RefObject<HTMLDivElement>
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Note that ref.current may be null. This is expected, because you may
    // conditionally render the ref-ed element, or you may forget to assign it
    if (!divRef.current) throw Error("divRef is not assigned");

    // Now divRef.current is sure to be HTMLDivElement
    doSomethingWith(divRef.current);
  });

  // Give the ref to an element so React can manage it for you
  return <div ref={divRef}>etc</div>;
}
```

If you are sure that `divRef.current` will never be null, it is also possible to use the non-null assertion operator `!`:

```tsx
const divRef = useRef<HTMLDivElement>(null!);
// Later... No need to check if it is null
doSomethingWith(divRef.current);
```

Note that you are opting out of type safety here - you will have a runtime error if you forget to assign the ref to an element in the render, or if the ref-ed element is conditionally rendered.

<details>
<summary><b>Tip: Choosing which <code>HTMLElement</code> to use</b></summary>
  
Refs demand specificity - it is not enough to just specify any old `HTMLElement`. If you don't know the name of the element type you need, you can check [lib.dom.ts](https://github.com/microsoft/TypeScript/blob/v3.9.5/lib/lib.dom.d.ts#L19224-L19343) or make an intentional type error and let the language service tell you:

![image](https://user-images.githubusercontent.com/6764957/116914284-1c436380-ac7d-11eb-9150-f52c571c5f07.png)

</details>

##### Option 2: Mutable value ref

**[To have a mutable value](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables):** provide the type you want, and make sure the initial value fully belongs to that type:

```tsx
function Foo() {
  // Technical-wise, this returns MutableRefObject<number | null>
  const intervalRef = useRef<number | null>(null);

  // You manage the ref yourself (that's why it's called MutableRefObject!)
  useEffect(() => {
    intervalRef.current = setInterval(...);
    return () => clearInterval(intervalRef.current);
  }, []);

  // The ref is not passed to any element's "ref" prop
  return <button onClick={/* clearInterval the ref */}>Cancel timer</button>;
}
```

##### See also

- [Related issue by @rajivpunjabi](https://github.com/typescript-cheatsheets/react/issues/388) - [Playground](https://www.typescriptlang.org/play#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcARFDvmQNwCwAUI7hAHarwCCYYcAvHAAUASn4A+OAG9GjOHAD0CBLLnKGcxHABiwKBzgQwMYGxS4WUACbBWAczgwIcSxFwBXEFlYxkxtgDoVTQBJVmBjZAAbOAA3KLcsOAB3YEjogCNE1jc0-zgAGQBPG3tHOAAVQrAsAGVcKGAjOHTCuDdUErhWNgBabLSUVFQsWBNWA2qoX2hA9VU4AGFKXyx0AFk3H3TIxOwCOAB5dIArLHwgpHcoSm84MGJJmFbgdG74ZcsDVkjC2Y01f7yFQsdjvLAEACM-EwVBg-naWD2AB4ABLlNb5GpgZCsACiO083jEgn6kQAhMJ6HMQfpKJCFpE2IkBNg8HCEci0RisTj8VhCTBiaSKVSVIoAaoLnBQuFgFFYvFEikBpkujkMps4FgAB7VfCdLmY7F4gleOFwAByEHg7U63VYfXVg2Go1MhhG0ygf3mAHVUtF6jgYLtwUdTvguta4Bstjs9mGznCpVcbvB7u7YM90B8vj9vYgLkDqWxaeCAEzQ1n4eHDTnoo2801EknqykyObii5SmpnNifA5GMZmCzWOwOJwudwC3xjKUyiLROKRBLJf3NLJO9KanV64xj0koVifQ08k38s1Sv0DJZBxIx5DbRGhk6J5Nua5mu4PEZPOAvSNgsgnxsHmXZzIgRZyDSYIEAAzJWsI1k+BCovWp58gKcAAD5qmkQqtqKHbyCexoYRecw7IQugcAs76ptCdIQv4KZmoRcjyMRaGkU28A4aSKiUXAwwgpYtEfrcAh0mWzF0ax7bsZx3Lceetx8eqAlYPAMAABa6KJskSXAdKwTJ4kwGxCjyKy-bfK05SrDA8mWVagHAbZeScOY0CjqUE6uOgqDaRAOSfKqOYgb8KiMaZ9GSeCEIMkyMVyUwRHWYc7nSvAgUQEk6AjMQXpReWyWGdFLHeBZHEuTCQEZT8xVwaV8BxZCzUWZQMDvuMghBHASJVnCWhTLYApiH1chIqgxpGeCfCSIxAC+Yj3o+8YvvgSLyNNOLjeBGhTTNdLzVJy3reGMBbTtrB7RoB3XbNBAneCsHLatcbPhdV3GrdB1WYhw3IKNZq-W2DCLYRO7QPAljgsgORcDwVJAA)
- [Example from Stefan Baumgartner](https://fettblog.eu/typescript-react/hooks/#useref) - [Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgIilQ3wFgAoCzAVwDsNgJa4AVJADxgElaxqYA6sBgALAGIQ01AM4AhfjCYAKAJRwA3hThwA9DrjBaw4CgA2waUjgB3YSLi1qp0wBo4AI35wYSZ6wCeYEgAymhQwGDw1lYoRHCmEBAA1oYA5nCY0HAozAASLACyADI8fDAAoqZIIEi0MFpwaEzS8IZllXAAvIjEMAB0MkjImAA8+cWl-JXVtTAAfEqOzioA3A1NtC1wTPIwirQAwuZoSV1wql1zGg3aenAt4RgOTqaNIkgn0g5ISAAmcDJvBA3h9TsBMAZeFNXjl-lIoEQ6nAOBZ+jddPpPPAmGgrPDEfAUS1pG5hAYvhAITBAlZxiUoRUqjU6m5RIDhOi7iIUF9RFYaqIIP9MlJpABCOCAUHJ0eDzm1oXAAGSKyHtUx9fGzNSacjaPWq6Ea6gI2Z9EUyVRrXV6gC+DRtVu0RBgxuYSnRIzm6O06h0ACpIdlfr9jExSQyOkxTP5GjkPFZBv9bKIDYSmbNpH04ABNFD+CV+nR2636kby+BETCddTlyo27w0zr4HycfC6L0lvUjLH7baHY5Jas7BRMI7AE42uYSUXed6pkY6HtMDulnQruCrCg2oA)

#### useImperativeHandle

Based on this [Stackoverflow answer](https://stackoverflow.com/a/69292925/5415299):

```tsx
// Countdown.tsx

// Define the handle types which will be passed to the forwardRef
export type CountdownHandle = {
  start: () => void;
};

type CountdownProps = {};

const Countdown = forwardRef<CountdownHandle, CountdownProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    // start() has type inference here
    start() {
      alert("Start");
    },
  }));

  return <div>Countdown</div>;
});
```

```tsx
// The component uses the Countdown component

import Countdown, { CountdownHandle } from "./Countdown.tsx";

function App() {
  const countdownEl = useRef<CountdownHandle>(null);

  useEffect(() => {
    if (countdownEl.current) {
      // start() has type inference here as well
      countdownEl.current.start();
    }
  }, []);

  return <Countdown ref={countdownEl} />;
}
```

##### See also:

- [Using ForwardRefRenderFunction](https://stackoverflow.com/a/62258685/5415299)

#### Custom Hooks

If you are returning an array in your Custom Hook, you will want to avoid type inference as TypeScript will infer a union type (when you actually want different types in each position of the array). Instead, use [TS 3.4 const assertions](https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/#const-assertions):

```tsx
import { useState } from "react";

export function useLoading() {
  const [isLoading, setState] = useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  return [isLoading, load] as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?target=5&jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCpAD0ljkwFcA7DYCZuRgZyQBkIKACbBmAcwAUASjgBvCnDhoO3eAG1g3AcNFiANHF4wAyjBQwkAXTgBeRMRgA6HklPmkEzCgA2vKQG4FJRV4b0EhWzgJFAAFHBBNJAAuODjcRIAeFGYATwA+GRs8uSDFIzcLCRgoRiQA0rgiGEYoTlj4xMdMUR9vHIlpW2Lys0qvXzr68kUAX0DpxqRm1rgNLXDdAzDhaxRuYOZVfzgAehO4UUwkKH21ACMICG9UZgMYHLAkCEw4baFrUSqVARb5RB5PF5wAA+cHen1BfykaksFBmQA)

This way, when you destructure you actually get the right types based on destructure position.

<details>
<summary><b>Alternative: Asserting a tuple return type</b></summary>

If you are [having trouble with const assertions](https://github.com/babel/babel/issues/9800), you can also assert or define the function return types:

```tsx
import { useState } from "react";

export function useLoading() {
  const [isLoading, setState] = useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  return [isLoading, load] as [
    boolean,
    (aPromise: Promise<any>) => Promise<any>
  ];
}
```

A helper function that automatically types tuples can also be helpful if you write a lot of custom hooks:

```tsx
function tuplify<T extends any[]>(...elements: T) {
  return elements;
}

function useArray() {
  const numberValue = useRef(3).current;
  const functionValue = useRef(() => {}).current;
  return [numberValue, functionValue]; // type is (number | (() => void))[]
}

function useTuple() {
  const numberValue = useRef(3).current;
  const functionValue = useRef(() => {}).current;
  return tuplify(numberValue, functionValue); // type is [number, () => void]
}
```

</details>

Note that the React team recommends that custom hooks that return more than two values should use proper objects instead of tuples, however.

#### More Hooks + TypeScript reading:

- https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d
- https://fettblog.eu/typescript-react/hooks/#useref

If you are writing a React Hooks library, don't forget that you should also expose your types for users to use.

#### Example React Hooks + TypeScript Libraries:

- https://github.com/mweststrate/use-st8
- https://github.com/palmerhq/the-platform
- https://github.com/sw-yx/hooks

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

<!--END-SECTION:hooks-->

<!--START-SECTION:class-components-->

#### Class Components

Within TypeScript, `React.Component` is a generic type (aka `React.Component<PropType, StateType>`), so you want to provide it with (optional) prop and state type parameters:

```tsx
type MyProps = {
  // using `interface` is also ok
  message: string;
};
type MyState = {
  count: number; // like this
};
class App extends React.Component<MyProps, MyState> {
  state: MyState = {
    // optional second annotation for better type inference
    count: 0,
  };
  render() {
    return (
      <div>
        {this.props.message} {this.state.count}
      </div>
    );
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCmATzCTgFlqAFHMAZzgF44BvCuHAD0QuAFd2wAHYBzOAANpMJFEzok8uME4oANuwhwIAawFwQSduxQykALjjsYUaTIDcFAL4fyNOo2oAZRgUZW4+MzQIMSkYBykxEAAjFTdhUV1gY3oYAAttLx80XRQrOABBMDA4JAAPZSkAE05kdBgAOgBhXEgpJFiAHiZWCA4AGgDg0KQAPgjyQSdphyYpsJ5+BcF0ozAYYAgpPUckKKa4FCkpCBD9w7hMaDgUmGUoOD96aUwVfrQkMyCKIxOJwAAMZm8ZiITRUAAoAJTzbZwIgwMRQKRwOGA7YDRrAABuM1xKN4eW07TAbHY7QsVhsSE8fAptKWynawNinlJcAGQgJxNxCJ8gh55E8QA)

Don't forget that you can export/import/extend these types/interfaces for reuse.

<details>
<summary><b>Why annotate <code>state</code> twice?</b></summary>

It isn't strictly necessary to annotate the `state` class property, but it allows better type inference when accessing `this.state` and also initializing the state.

This is because they work in two different ways, the 2nd generic type parameter will allow `this.setState()` to work correctly, because that method comes from the base class, but initializing `state` inside the component overrides the base implementation so you have to make sure that you tell the compiler that you're not actually doing anything different.

[See commentary by @ferdaber here](https://github.com/typescript-cheatsheets/react/issues/57).

</details>

<details>
  <summary><b>No need for <code>readonly</code></b></summary>

You often see sample code include `readonly` to mark props and state immutable:

```tsx
type MyProps = {
  readonly message: string;
};
type MyState = {
  readonly count: number;
};
```

This is not necessary as `React.Component<P,S>` already marks them as immutable. ([See PR and discussion!](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/26813))

</details>

**Class Methods**: Do it like normal, but just remember any arguments for your functions also need to be typed:

```tsx
class App extends React.Component<{ message: string }, { count: number }> {
  state = { count: 0 };
  render() {
    return (
      <div onClick={() => this.increment(1)}>
        {this.props.message} {this.state.count}
      </div>
    );
  }
  increment = (amt: number) => {
    // like this
    this.setState((state) => ({
      count: state.count + amt,
    }));
  };
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BBMMOJADxiQDsATRsnQwAdAGFckHrxgAeAN5wQSBigDmSAFxw6MKMB5q4AXwA0cRWggBXHjG09rIAEZIoJgHwWKcHTBTccAC8FnBWtvZwAAwmANw+cET8bgAUAJTe5L6+RDDWUDxwKQnZcLJ8wABucBA8YtTAaADWQfLpwV4wABbAdCIGaETKdikAjGnGHiWlFt29ImA4YH3KqhrGsz19ugFIIuF2xtO+sgD0FZVTWdlp8ddH1wNDMsFFKCCRji5uGUFe8tNTqc4A0mkg4HM6NNISI6EgYABlfzcFI7QJ-IoA66lA6RNF7XFwADUcHeMGmxjStwSxjuxiAA)

**Class Properties**: If you need to declare class properties for later use, just declare it like `state`, but without assignment:

```tsx
class App extends React.Component<{
  message: string;
}> {
  pointer: number; // like this
  componentDidMount() {
    this.pointer = 3;
  }
  render() {
    return (
      <div>
        {this.props.message} and {this.pointer}
      </div>
    );
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BBMMOJADxiQDsATRsnQwAdAGFckHrxgAeAN4U4cEEgYoA5kgBccOjCjAeGgNwUAvgD44i8sshHuUXTwCuIAEZIoJuAHo-OGpgAGskOBgAC2A6JTg0SQhpHhgAEWA+AFkIVxSACgBKGzjlKJiRBxTvOABeOABmMzs4cziifm9C4ublIhhXKB44PJLlOFk+YAA3S1GxmzK6CpwwJdV1LXM4FH4F6KXKp1aesdk-SZnRgqblY-MgA)

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

#### Typing getDerivedStateFromProps

Before you start using `getDerivedStateFromProps`, please go through the [documentation](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops) and [You Probably Don't Need Derived State](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html). Derived State can be implemented using hooks which can also help set up memoization.

Here are a few ways in which you can annotate `getDerivedStateFromProps`

1. If you have explicitly typed your derived state and want to make sure that the return value from `getDerivedStateFromProps` conforms to it.

```tsx
class Comp extends React.Component<Props, State> {
  static getDerivedStateFromProps(
    props: Props,
    state: State
  ): Partial<State> | null {
    //
  }
}
```

2. When you want the function's return value to determine your state.

```tsx
class Comp extends React.Component<
  Props,
  ReturnType<typeof Comp["getDerivedStateFromProps"]>
> {
  static getDerivedStateFromProps(props: Props) {}
}
```

3. When you want derived state with other state fields and memoization

```tsx
type CustomValue = any;
interface Props {
  propA: CustomValue;
}
interface DefinedState {
  otherStateField: string;
}
type State = DefinedState & ReturnType<typeof transformPropsToState>;
function transformPropsToState(props: Props) {
  return {
    savedPropA: props.propA, // save for memoization
    derivedState: props.propA,
  };
}
class Comp extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      otherStateField: "123",
      ...transformPropsToState(props),
    };
  }
  static getDerivedStateFromProps(props: Props, state: State) {
    if (isEqual(props.propA, state.savedPropA)) return null;
    return transformPropsToState(props);
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoUSWOYAZwFEBHAVxQBs5tcD2IATFHQAWAOnpJWHMuQowAnmCRwAwizoxcANQ4tlAXjgoAdvIDcFYMZhIomdMoAKOMHTgBvCnDhgXAQQAuVXVNEB12PQtyAF9La1t7NGUAESRMKyR+AGUYFBsPLzgIGGFbHLykADFgJHZ+II0oKwBzKNjyBSU4cvzDVPTjTJ7lADJEJBgWKGMAFUUkAB5OpAhMOBgoEzpMaBBnCFcZiGGAPijMFmMMYAhjdc3jbd39w+PcmwAKXwO6IJe6ACUBXI3iIk2mwO83joKAAbpkXoEfC46KJvmA-AAaOAAehxcBh8K40DgICQIAgwAAXnkbsZCt5+LZgPDsu8kEF0aj0X5CtE2hQ0OwhG4VLgwHAkAAPGzGfhuZDoGCiRxTJBi8C3JDWBb-bGnSFwNC3RosDDQL4ov4ooGeEFQugsJRQS0-AFRKHrYT0UQaCpwQx2z3eYqlKDDaq1epwABEAEYAEwAZhjmIZUNEmY2Wx2UD2KKOw1drgB6f5fMKfpgwDQcGaE1STVZEZw+Z+xd+cD1BPZQWGtvTwDWH3ozDY7A7aP82KrSF9cIR-gBQLBUzuxhY7HYHqhq4h2ceubbryLXPdFZiQA)

<!--END-SECTION:class-components-->

<!--START-SECTION:default-props-->

#### You May Not Need `defaultProps`

As per [this tweet](https://twitter.com/dan_abramov/status/1133878326358171650), defaultProps will eventually be deprecated. You can check the discussions here:

- [Original tweet](https://twitter.com/hswolff/status/1133759319571345408)
- More info can also be found in [this article](https://medium.com/@matanbobi/react-defaultprops-is-dying-whos-the-contender-443c19d9e7f1)

The consensus is to use object default values.

Function Components:

```tsx
type GreetProps = { age?: number };

const Greet = ({ age = 21 }: GreetProps) => // etc
```

Class Components:

```tsx
type GreetProps = {
  age?: number;
};

class Greet extends React.Component<GreetProps> {
  render() {
    const { age = 21 } = this.props;
    /*...*/
  }
}

let el = <Greet age={3} />;
```

#### Typing `defaultProps`

Type inference improved greatly for `defaultProps` in [TypeScript 3.0+](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html), although [some edge cases are still problematic](https://github.com/typescript-cheatsheets/react/issues/61).

**Function Components**

```tsx
// using typeof as a shortcut; note that it hoists!
// you can also declare the type of DefaultProps if you choose
// e.g. https://github.com/typescript-cheatsheets/react/issues/415#issuecomment-841223219
type GreetProps = { age: number } & typeof defaultProps;

const defaultProps = {
  age: 21,
};

const Greet = (props: GreetProps) => {
  // etc
};
Greet.defaultProps = defaultProps;
```

_[See this in TS Playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcARFDvmQNwBQdMAnmFnAOKVYwAKxY6ALxwA3igDmWAFxwAdgFcQAIyxQ4AXzgAyOM1YQCcACZYCyeQBte-VPVwRZqeCbOXrEAXGEi6cCdLgAJgBGABo6dXo6e0d4TixuLzgACjAbGXjuPg9UAEovAD5RXzhKGHkoWTgAHiNgADcCkTScgDpkSTgAeiQFZVVELvVqrrrGiPpMmFaXcytsz2FZtwXbOiA)_

For **Class components**, there are [a couple ways to do it](https://github.com/typescript-cheatsheets/react/pull/103#issuecomment-481061483) (including using the `Pick` utility type) but the recommendation is to "reverse" the props definition:

```tsx
type GreetProps = typeof Greet.defaultProps & {
  age: number;
};

class Greet extends React.Component<GreetProps> {
  static defaultProps = {
    age: 21,
  };
  /*...*/
}

// Type-checks! No type assertions needed!
let el = <Greet age={3} />;
```

<details>
<summary><b><code>React.JSX.LibraryManagedAttributes</code> nuance for library authors</b></summary>

The above implementations work fine for App creators, but sometimes you want to be able to export `GreetProps` so that others can consume it. The problem here is that the way `GreetProps` is defined, `age` is a required prop when it isn't because of `defaultProps`.

The insight to have here is that [`GreetProps` is the _internal_ contract for your component, not the _external_, consumer facing contract](https://github.com/typescript-cheatsheets/react/issues/66#issuecomment-453878710). You could create a separate type specifically for export, or you could make use of the `React.JSX.LibraryManagedAttributes` utility:

```tsx
// internal contract, should not be exported out
type GreetProps = {
  age: number;
};

class Greet extends Component<GreetProps> {
  static defaultProps = { age: 21 };
}

// external contract
export type ApparentGreetProps = React.JSX.LibraryManagedAttributes<
  typeof Greet,
  GreetProps
>;
```

This will work properly, although hovering over`ApparentGreetProps`may be a little intimidating. You can reduce this boilerplate with the`ComponentProps` utility detailed below.

</details>

#### Consuming Props of a Component with defaultProps

A component with `defaultProps` may seem to have some required props that actually aren't.

##### Problem Statement

Here's what you want to do:

```tsx
interface IProps {
  name: string;
}
const defaultProps = {
  age: 25,
};
const GreetComponent = ({ name, age }: IProps & typeof defaultProps) => (
  <div>{`Hello, my name is ${name}, ${age}`}</div>
);
GreetComponent.defaultProps = defaultProps;

const TestComponent = (props: React.ComponentProps<typeof GreetComponent>) => {
  return <h1 />;
};

// Property 'age' is missing in type '{ name: string; }' but required in type '{ age: number; }'
const el = <TestComponent name="foo" />;
```

##### Solution

Define a utility that applies `React.JSX.LibraryManagedAttributes`:

```tsx
type ComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? React.JSX.LibraryManagedAttributes<T, P>
  : never;

const TestComponent = (props: ComponentProps<typeof GreetComponent>) => {
  return <h1 />;
};

// No error
const el = <TestComponent name="foo" />;
```

[_See this in TS Playground_](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcARFDvmQNwBQdMAnmFnAMImQB2W3MABWJhUAHgAqAPjgBeOOLhYAHjD4ATdNjwwAdJ3ARe-cSyyjg3AlihwB0gD6Yqu-Tz4xzl67cl04cAH44ACkAZQANHQAZYAAjKGQoJgBZZG5kAHMsNQBBGBgoOIBXVTFxABofPzgALjheADdrejoLVSgCPDYASSEIETgAb2r0kCw61AKLDPoAXzpcQ0m4NSxOooAbQWF0OWH-TPG4ACYAVnK6WfpF7mWAcUosGFdDd1k4AApB+uQxysO4LM6r0dnAAGRwZisCAEFZrZCbbb9VAASlk0g+1VEamADUkgwABgAJLAbDYQSogJg-MZwYDoAAkg1GWFmlSZh1mBNmogA9Di8XQUfQHlgni8jLpVustn0BnJpQjZTsWrzeXANsh2gwbstxFhJhK3nIPmAdnUjfw5WIoVgYXBReKuK9+JI0TJpPs4JQYEUoNw4KIABYARjgvN8VwYargADkIIooMQoAslvBSe8JAbns7JTSsDIyAQIBAyOHJDQgA)

#### Misc Discussions and Knowledge

<details>
<summary><b>Why does <code>React.FC</code> break <code>defaultProps</code>?</b></summary>

You can check the discussions here:

- https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680
- https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30695
- https://github.com/typescript-cheatsheets/react/issues/87

This is just the current state and may be fixed in future.

</details>

<details>
<summary><b>TypeScript 2.9 and earlier</b></summary>

For TypeScript 2.9 and earlier, there's more than one way to do it, but this is the best advice we've yet seen:

```ts
type Props = Required<typeof MyComponent.defaultProps> & {
  /* additional props here */
};

export class MyComponent extends React.Component<Props> {
  static defaultProps = {
    foo: "foo",
  };
}
```

Our former recommendation used the `Partial type` feature in TypeScript, which means that the current interface will fulfill a partial version on the wrapped interface. In that way we can extend defaultProps without any changes in the types!

```ts
interface IMyComponentProps {
  firstProp?: string;
  secondProp: IPerson[];
}

export class MyComponent extends React.Component<IMyComponentProps> {
  public static defaultProps: Partial<IMyComponentProps> = {
    firstProp: "default",
  };
}
```

The problem with this approach is it causes complex issues with the type inference working with `React.JSX.LibraryManagedAttributes`. Basically it causes the compiler to think that when creating a JSX expression with that component, that all of its props are optional.

[See commentary by @ferdaber here](https://github.com/typescript-cheatsheets/react/issues/57) and [here](https://github.com/typescript-cheatsheets/react/issues/61).

</details>

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

<!--END-SECTION:default-props-->

<!--START-SECTION:basic-type-examples-->

#### Typing Component Props

This is intended as a basic orientation and reference for React developers familiarizing with TypeScript.

#### Basic Prop Types Examples

A list of TypeScript types you will likely use in a React+TypeScript app:

```tsx
type AppProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** array of a type! */
  names: string[];
  /** string literals to specify exact string values, with a union type to join them together */
  status: "waiting" | "success";
  /** an object with known properties (but could have more at runtime) */
  obj: {
    id: string;
    title: string;
  };
  /** array of objects! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  /** any non-primitive value - can't access any properties (NOT COMMON but useful as placeholder) */
  obj2: object;
  /** an interface with no required properties - (NOT COMMON, except for things like `React.Component<{}, State>`) */
  obj3: {};
  /** a dict object with any number of properties of the same type */
  dict1: {
    [key: string]: MyTypeHere;
  };
  dict2: Record<string, MyTypeHere>; // equivalent to dict1
  /** function that doesn't take or return anything (VERY COMMON) */
  onClick: () => void;
  /** function with named prop (VERY COMMON) */
  onChange: (id: number) => void;
  /** function type syntax that takes an event (VERY COMMON) */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** alternative function type syntax that takes an event (VERY COMMON) */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function;
  /** an optional prop (VERY COMMON!) */
  optional?: OptionalType;
  /** when passing down the state setter function returned by `useState` to a child component. `number` is an example, swap out with whatever the type of your state */
  setState: React.Dispatch<React.SetStateAction<number>>;
};
```

##### `object` as the non-primitive type

`object` is a common source of misunderstanding in TypeScript. It does not mean "any object" but rather "any non-primitive type", which means it represents anything that is not `number`, `string`, `boolean`, `symbol`, `null` or `undefined`.

Typing "any non-primitive value" is most likely not something that you should do much in React, which means you will probably not use `object` much.

##### Empty interface, `{}` and `Object`

An empty interface, `{}` and `Object` all represent "any non-nullish value"—not "an empty object" as you might think. [Using these types is a common source of misunderstanding and is not recommended](https://typescript-eslint.io/rules/no-empty-interface/).

```ts
interface AnyNonNullishValue {} // equivalent to `type AnyNonNullishValue = {}` or `type AnyNonNullishValue = Object`

let value: AnyNonNullishValue;

// these are all fine, but might not be expected
value = 1;
value = "foo";
value = () => alert("foo");
value = {};
value = { foo: "bar" };

// these are errors
value = undefined;
value = null;
```

#### Useful React Prop Type Examples

Relevant for components that accept other React components as props.

```tsx
export declare interface AppProps {
  children?: React.ReactNode; // best, accepts everything React can render
  childrenElement: React.JSX.Element; // A single React element
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
  //  more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  props: Props & React.ComponentPropsWithoutRef<"button">; // to impersonate all the props of a button element and explicitly not forwarding its ref
  props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>; // to impersonate all the props of MyButtonForwardedRef and explicitly forwarding its ref
}
```

<details>
<summary><b>Small <code>React.ReactNode</code> edge case before React 18</b></summary>

Before the [React 18 type updates](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210), this code typechecked but had a runtime error:

```tsx
type Props = {
  children?: React.ReactNode;
};

function Comp({ children }: Props) {
  return <div>{children}</div>;
}
function App() {
  // Before React 18: Runtime error "Objects are not valid as a React child"
  // After React 18: Typecheck error "Type '{}' is not assignable to type 'ReactNode'"
  return <Comp>{{}}</Comp>;
}
```

This is because `ReactNode` includes `ReactFragment` which allowed type `{}` before React 18.

[Thanks @pomle for raising this.](https://github.com/typescript-cheatsheets/react/issues/357)

</details>

<details>
 <summary><b>React.JSX.Element vs React.ReactNode?</b></summary>

Quote [@ferdaber](https://github.com/typescript-cheatsheets/react/issues/57): A more technical explanation is that a valid React node is not the same thing as what is returned by `React.createElement`. Regardless of what a component ends up rendering, `React.createElement` always returns an object, which is the `React.JSX.Element` interface, but `React.ReactNode` is the set of all possible return values of a component.

- `React.JSX.Element` -> Return value of `React.createElement`
- `React.ReactNode` -> Return value of a component

</details>

[More discussion: Where ReactNode does not overlap with React.JSX.Element](https://github.com/typescript-cheatsheets/react/issues/129)

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

#### Types or Interfaces?

You can use either Types or Interfaces to type Props and State, so naturally the question arises - which do you use?

##### TL;DR

Use Interface until You Need Type - [orta](https://twitter.com/orta/status/1356129195835973632?s=20).

##### More Advice

Here's a helpful rule of thumb:

- always use `interface` for public API's definition when authoring a library or 3rd party ambient type definitions, as this allows a consumer to extend them via _declaration merging_ if some definitions are missing.

- consider using `type` for your React Component Props and State, for consistency and because it is more constrained.

You can read more about the reasoning behind this rule of thumb in [Interface vs Type alias in TypeScript 2.7](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c).

The TypeScript Handbook now also includes guidance on [Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).

> Note: At scale, there are performance reasons to prefer interfaces ([see official Microsoft notes on this](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections)) but [take this with a grain of salt](https://news.ycombinator.com/item?id=25201887)

Types are useful for union types (e.g. `type MyType = TypeA | TypeB`) whereas Interfaces are better for declaring dictionary shapes and then `implementing` or `extending` them.

##### Useful table for Types vs Interfaces

It's a nuanced topic, don't get too hung up on it. Here's a handy table:

| Aspect                                          | Type | Interface |
| ----------------------------------------------- | :--: | :-------: |
| Can describe functions                          |  ✅  |    ✅     |
| Can describe constructors                       |  ✅  |    ✅     |
| Can describe tuples                             |  ✅  |    ✅     |
| Interfaces can extend it                        |  ⚠️  |    ✅     |
| Classes can extend it                           |  🚫  |    ✅     |
| Classes can implement it (`implements`)         |  ⚠️  |    ✅     |
| Can intersect another one of its kind           |  ✅  |    ⚠️     |
| Can create a union with another one of its kind |  ✅  |    🚫     |
| Can be used to create mapped types              |  ✅  |    🚫     |
| Can be mapped over with mapped types            |  ✅  |    ✅     |
| Expands in error messages and logs              |  ✅  |    🚫     |
| Can be augmented                                |  🚫  |    ✅     |
| Can be recursive                                |  ⚠️  |    ✅     |

⚠️ In some cases

(source: [Karol Majewski](https://twitter.com/karoljmajewski/status/1082413696075382785))

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

<!--END-SECTION:basic-type-examples-->

<!--START-SECTION:get-derived-state-from-props-->

## getDerivedStateFromProps

Before you start using `getDerivedStateFromProps`, please go through the [documentation](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops) and [You Probably Don't Need Derived State](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html). Derived State can be easily achieved using hooks which can also help set up memoization easily.

Here are a few ways in which you can annotate `getDerivedStateFromProps`

1. If you have explicitly typed your derived state and want to make sure that the return value from `getDerivedStateFromProps` conforms to it.

```tsx
class Comp extends React.Component<Props, State> {
  static getDerivedStateFromProps(
    props: Props,
    state: State
  ): Partial<State> | null {
    //
  }
}
```

2. When you want the function's return value to determine your state.

```tsx
class Comp extends React.Component<
  Props,
  ReturnType<typeof Comp["getDerivedStateFromProps"]>
> {
  static getDerivedStateFromProps(props: Props) {}
}
```

3. When you want derived state with other state fields and memoization

```tsx
type CustomValue = any;
interface Props {
  propA: CustomValue;
}
interface DefinedState {
  otherStateField: string;
}
type State = DefinedState & ReturnType<typeof transformPropsToState>;
function transformPropsToState(props: Props) {
  return {
    savedPropA: props.propA, // save for memoization
    derivedState: props.propA,
  };
}
class Comp extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      otherStateField: "123",
      ...transformPropsToState(props),
    };
  }
  static getDerivedStateFromProps(props: Props, state: State) {
    if (isEqual(props.propA, state.savedPropA)) return null;
    return transformPropsToState(props);
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoUSWOYAZwFEBHAVxQBs5tcD2IATFHQAWAOnpJWHMuQowAnmCRwAwizoxcANQ4tlAXjgoAdvIDcFYMZhIomdMoAKOMHTgBvCnDhgXAQQAuVXVNEB12PQtyAF9La1t7NGUAESRMKyR+AGUYFBsPLzgIGGFbHLykADFgJHZ+II0oKwBzKNjyBSU4cvzDVPTjTJ7lADJEJBgWKGMAFUUkAB5OpAhMOBgoEzpMaBBnCFcZiGGAPijMFmMMYAhjdc3jbd39w+PcmwAKXwO6IJe6ACUBXI3iIk2mwO83joKAAbpkXoEfC46KJvmA-AAaOAAehxcBh8K40DgICQIAgwAAXnkbsZCt5+LZgPDsu8kEF0aj0X5CtE2hQ0OwhG4VLgwHAkAAPGzGfhuZDoGCiRxTJBi8C3JDWBb-bGnSFwNC3RosDDQL4ov4ooGeEFQugsJRQS0-AFRKHrYT0UQaCpwQx2z3eYqlKDDaq1epwABEAEYAEwAZhjmIZUNEmY2Wx2UD2KKOw1drgB6f5fMKfpgwDQcGaE1STVZEZw+Z+xd+cD1BPZQWGtvTwDWH3ozDY7A7aP82KrSF9cIR-gBQLBUzuxhY7HYHqhq4h2ceubbryLXPdFZiQA)

<!--END-SECTION:get-derived-state-from-props-->

<!--START-SECTION:forms-and-events-->

#### Forms and Events

If performance is not an issue (and it usually isn't!), inlining handlers is easiest as you can just use [type inference and contextual typing](https://www.typescriptlang.org/docs/handbook/type-inference.html#contextual-typing):

```tsx
const el = (
  <button
    onClick={(event) => {
      /* event will be correctly typed automatically! */
    }}
  />
);
```

But if you need to define your event handler separately, IDE tooling really comes in handy here, as the @type definitions come with a wealth of typing. Type what you are looking for and usually the autocomplete will help you out. Here is what it looks like for an `onChange` for a form event:

```tsx
type State = {
  text: string;
};
class App extends React.Component<Props, State> {
  state = {
    text: "",
  };

  // typing on RIGHT hand side of =
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ text: e.currentTarget.value });
  };
  render() {
    return (
      <div>
        <input type="text" value={this.state.text} onChange={this.onChange} />
      </div>
    );
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BBMMOJADxiQDsATRsnQwAdAGFckHrxgAeCnDgBvAL4AaBcs2KA9Drg8IcMDjB1tcblwBccOjCjAeAcwDcmlRQB8W8ovso3HAAvL6KilYwtgBE0R7ulH5wepYAnmBOznAQPIgAkgDiABIAKnAAFij8dsB8SNmYIZo5YpUu9aEAFEi2QhgiAGLQIACiAG4ysqUAsgAyeTxgAK4wI9RIIDJeAJS2YxC1IT5KFjDlwHQidEgwAMowgUidSpacUewiaEtQRDwwJSgoM4biIxihqEt6iptglFCpYXBfnUoJ1tmFwkQYN9cp0LIpZHxgGMvHjwrInMt4DB0khgtFItE4GCIbSlGcLlcHtwRJEVNkeK0qsDgmzzpcWm1gXydCSkuE4LIdITiRYYR4KCogA)

Instead of typing the arguments and return values with `React.FormEvent<>` and `void`, you may alternatively apply types to the event handler itself (_contributed by @TomasHubelbauer_):

```tsx
  // typing on LEFT hand side of =
  onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({text: e.currentTarget.value})
  }
```

<details>

<summary><b>Why two ways to do the same thing?</b></summary>

The first method uses an inferred method signature `(e: React.FormEvent<HTMLInputElement>): void` and the second method enforces a type of the delegate provided by `@types/react`. So `React.ChangeEventHandler<>` is simply a "blessed" typing by `@types/react`, whereas you can think of the inferred method as more... _artisanally hand-rolled_. Either way it's a good pattern to know. [See our Github PR for more](https://github.com/typescript-cheatsheets/react/pull/24).

</details>

**Typing onSubmit, with Uncontrolled components in a Form**

If you don't quite care about the type of the event, you can just use `React.SyntheticEvent`. If your target form has custom named inputs that you'd like to access, you can use a type assertion:

```tsx
<form
  ref={formRef}
  onSubmit={(e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!
    // etc...
  }}
>
  <div>
    <label>
      Email:
      <input type="email" name="email" />
    </label>
  </div>
  <div>
    <label>
      Password:
      <input type="password" name="password" />
    </label>
  </div>
  <div>
    <input type="submit" value="Log in" />
  </div>
</form>
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtCAOwGctoRlM4BeRYmAOgFc6kLABQBKClVoM4AMSbs4o9gD4FFOHAA8mJmrhFMbAN7aozJJgC+u2gGVeAIxDAYRoUgBcndDxsBPGjAAFkgwwGgAogBuSAEiynCGuupI3GBE0QEAIuYovAA2MKIA3Elw1PTwMChQAOYh8ilVtfUodHAwvmBIEKyN1XXwAGQJpckgKMB5noZwkSh5vB5wDFDANDVwFiXk6rtwYK10AO7QACbTs-OLnitrG1ulDzu75VJI45PyTQPc7xN53DmCyQRTgAHowe1Okg0ME0ABrOgAQlKr3gBzoxzOX36IVShxOUFOgKuIPBkI6XVhMMRKOe6ghcBCaG4rN0Fis5CUug0p2AkW59M0eRQ9iQeUFe3U4Q+U1GmjWYF4lWhbAARH9Jmq4DQUCAkOrNXltWDJbsNGCRWKJTywXyBTz7Wb1BoreLnbsAAoEs7ueUaRXKqFddUYrFE7W6-Whn0R8Eei1um3PC1Ox38hOBlUhtV0BxOGDaoGLdUAGQgGzWJrNqYzFAtJhAgpEQA)

Of course, if you're making any sort of significant form, [you should use Formik](https://jaredpalmer.com/formik) or [React Hook Form](https://react-hook-form.com/), which are written in TypeScript.

##### List of event types

| Event Type       | Description                                                                                                                                                                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AnimationEvent   | CSS Animations.                                                                                                                                                                                                                                                        |
| ChangeEvent      | Changing the value of `<input>`, `<select>` and `<textarea>` element.                                                                                                                                                                                                  |
| ClipboardEvent   | Using copy, paste and cut events.                                                                                                                                                                                                                                      |
| CompositionEvent | Events that occur due to the user indirectly entering text (e.g. depending on Browser and PC setup, a popup window may appear with additional characters if you e.g. want to type Japanese on a US Keyboard)                                                           |
| DragEvent        | Drag and drop interaction with a pointer device (e.g. mouse).                                                                                                                                                                                                          |
| FocusEvent       | Event that occurs when elements gets or loses focus.                                                                                                                                                                                                                   |
| FormEvent        | Event that occurs whenever a form or form element gets/loses focus, a form element value is changed or the form is submitted.                                                                                                                                          |
| InvalidEvent     | Fired when validity restrictions of an input fails (e.g `<input type="number" max="10">` and someone would insert number 20).                                                                                                                                          |
| KeyboardEvent    | User interaction with the keyboard. Each event describes a single key interaction.                                                                                                                                                                                     |
| MouseEvent       | Events that occur due to the user interacting with a pointing device (e.g. mouse)                                                                                                                                                                                      |
| PointerEvent     | Events that occur due to user interaction with a variety pointing of devices such as mouse, pen/stylus, a touchscreen and which also supports multi-touch. Unless you develop for older browsers (IE10 or Safari 12), pointer events are recommended. Extends UIEvent. |
| TouchEvent       | Events that occur due to the user interacting with a touch device. Extends UIEvent.                                                                                                                                                                                    |
| TransitionEvent  | CSS Transition. Not fully browser supported. Extends UIEvent                                                                                                                                                                                                           |
| UIEvent          | Base Event for Mouse, Touch and Pointer events.                                                                                                                                                                                                                        |
| WheelEvent       | Scrolling on a mouse wheel or similar input device. (Note: `wheel` event should not be confused with the `scroll` event)                                                                                                                                               |
| SyntheticEvent   | The base event for all above events. Should be used when unsure about event type                                                                                                                                                                                       |

<details>
<summary><b>What about <code>InputEvent</code>?</b></summary>

You've probably noticed that there is no `InputEvent`. This is because it is not supported by Typescript as the event itself has no fully browser support and may behave differently in different browsers. You can use `KeyboardEvent` instead.

Sources:

- https://github.com/microsoft/TypeScript/issues/29441
- https://developer.mozilla.org/en-US/docs/Web/API/InputEvent
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event

</details>

<!--END-SECTION:forms-and-events-->

<!--START-SECTION:context-->

#### Context

#### Basic example

Here's a basic example of creating a context containing the active theme.

```tsx
import { createContext } from "react";

type ThemeContextType = "light" | "dark";

const ThemeContext = createContext<ThemeContextType>("light");
```

Wrap the components that need the context with a context provider:

```tsx
import { useState } from "react";

const App = () => {
  const [theme, setTheme] = useState<ThemeContextType>("light");

  return (
    <ThemeContext.Provider value={theme}>
      <MyComponent />
    </ThemeContext.Provider>
  );
};
```

Call `useContext` to read and subscribe to the context.

```tsx
import { useContext } from "react";

const MyComponent = () => {
  const theme = useContext(ThemeContext);

  return <p>The current theme is {theme}.</p>;
};
```

#### Without default context value

If you don't have any meaningful default value, specify `null`:

```tsx
import { createContext } from "react";

interface CurrentUserContextType {
  username: string;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);
```

```tsx
const App = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUserContextType>({
    username: "filiptammergard",
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <MyComponent />
    </CurrentUserContext.Provider>
  );
};
```

Now that the type of the context can be `null`, you'll notice that you'll get a `'currentUser' is possibly 'null'` TypeScript error if you try to access the `username` property. You can use optional chaining to access `username`:

```tsx
import { useContext } from "react";

const MyComponent = () => {
  const currentUser = useContext(CurrentUserContext);

  return <p>Name: {currentUser?.username}.</p>;
};
```

However, it would be preferrable to not have to check for `null`, since we know that the context won't be `null`. One way to do that is to provide a custom hook to use the context, where an error is thrown if the context is not provided:

```tsx
import { createContext } from "react";

interface CurrentUserContextType {
  username: string;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

const useCurrentUser = () => {
  const currentUserContext = useContext(CurrentUserContext);

  if (!currentUserContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }

  return currentUserContext;
};
```

Using a runtime type check in this will has the benefit of printing a clear error message in the console when a provider is not wrapping the components properly. Now it's possible to access `currentUser.username` without checking for `null`:

```tsx
import { useContext } from "react";

const MyComponent = () => {
  const currentUser = useCurrentUser();

  return <p>Username: {currentUser.username}.</p>;
};
```

##### Type assertion as an alternative

Another way to avoid having to check for `null` is to use type assertion to tell TypeScript you know the context is not `null`:

```tsx
import { useContext } from "react";

const MyComponent = () => {
  const currentUser = useContext(CurrentUserContext);

  return <p>Name: {currentUser!.username}.</p>;
};
```

Another option is to use an empty object as default value and cast it to the expected context type:

```tsx
const CurrentUserContext = createContext<CurrentUserContextType>(
  {} as CurrentUserContextType
);
```

You can also use non-null assertion to get the same result:

```tsx
const CurrentUserContext = createContext<CurrentUserContextType>(null!);
```

When you don't know what to choose, prefer runtime checking and throwing over type asserting.

<!--END-SECTION:context-->

<!--START-SECTION:forward-create-ref-->

#### forwardRef/createRef

Check the [Hooks section](https://github.com/typescript-cheatsheets/react/blob/main/README.md#hooks) for `useRef`.

`createRef`:

```tsx
import { createRef, PureComponent } from "react";

class CssThemeProvider extends PureComponent<Props> {
  private rootRef = createRef<HTMLDivElement>(); // like this
  render() {
    return <div ref={this.rootRef}>{this.props.children}</div>;
  }
}
```

`forwardRef`:

```tsx
import { forwardRef, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  type: "submit" | "button";
}
export type Ref = HTMLButtonElement;

export const FancyButton = forwardRef<Ref, Props>((props, ref) => (
  <button ref={ref} className="MyClassName" type={props.type}>
    {props.children}
  </button>
));
```

<details>
<summary><b>Side note: the <code>ref</code> you get from <code>forwardRef</code> is mutable so you can assign to it if needed.</b></summary>

This was done [on purpose](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43265/). You can make it immutable if you have to - assign `React.Ref` if you want to ensure nobody reassigns it:

```tsx
import { forwardRef, ReactNode, Ref } from "react";

interface Props {
  children?: ReactNode;
  type: "submit" | "button";
}

export const FancyButton = forwardRef(
  (
    props: Props,
    ref: Ref<HTMLButtonElement> // <-- here!
  ) => (
    <button ref={ref} className="MyClassName" type={props.type}>
      {props.children}
    </button>
  )
);
```

</details>

If you are grabbing the props of a component that forwards refs, use [`ComponentPropsWithRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L770).

#### Generic forwardRefs

Read more context in https://fettblog.eu/typescript-react-generic-forward-refs/:

##### Option 1 - Wrapper component

```ts
type ClickableListProps<T> = {
  items: T[];
  onSelect: (item: T) => void;
  mRef?: React.Ref<HTMLUListElement> | null;
};

export function ClickableList<T>(props: ClickableListProps<T>) {
  return (
    <ul ref={props.mRef}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button onClick={(el) => props.onSelect(item)}>Select</button>
          {item}
        </li>
      ))}
    </ul>
  );
}
```

##### Option 2 - Redeclare forwardRef

```ts
// Redecalare forwardRef
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

// Just write your components like you're used to!
import { forwardRef, ForwardedRef } from "react";

interface ClickableListProps<T> {
  items: T[];
  onSelect: (item: T) => void;
}

function ClickableListInner<T>(
  props: ClickableListProps<T>,
  ref: ForwardedRef<HTMLUListElement>
) {
  return (
    <ul ref={ref}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button onClick={(el) => props.onSelect(item)}>Select</button>
          {item}
        </li>
      ))}
    </ul>
  );
}

export const ClickableList = forwardRef(ClickableListInner);
```

#### More Info

- https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315

You may also wish to do [Conditional Rendering with `forwardRef`](https://github.com/typescript-cheatsheets/react/issues/167).

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

<!--END-SECTION:forward-create-ref-->

<!--START-SECTION:portals-->

#### Portals

Using `ReactDOM.createPortal`:

```tsx
const modalRoot = document.getElementById("modal-root") as HTMLElement;
// assuming in your html file has a div with id 'modal-root';

export class Modal extends React.Component<{ children?: React.ReactNode }> {
  el: HTMLElement = document.createElement("div");

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoUSWRYmAEQHkBZObXAo9GAWgBNcZchTQQAdgGd4ICHxQAbBBAjwAvHAFoAriCRiYAOgDmSGAFF5SXfoBCATwCSfABQAiGXPk8cK1wEo4FAk4AAkAFWYAGQsrPRgAbgoAeiTAiQkdYDEjOCy4OwgtKDgACxgQeTZgS1KgwI1gADc4AHdgGBLcvgIPBW9lGHxE4XIkAA9qeDR5IODmWQU4cZg9PmDkbgMAYVxIMTi4AG8KOCX5AC5QiOjLazUNCG07gzQuFZi7tz4m-2GTuFE4HEcXowD48y0+mcAWO5FOp16igGBhQYDAqy2JWqLg6wAkBiQ8j8w1OAF8KP9AXs4gB1aryACqYhkkJg0KO-wRCyRKgMRBkjSQmOxzlx+MJxP+5JGpyIYj4SCg7Nh8LgRBgRTEtG4TGYLzeSAACtAYApRVj8WAcGB8WgsfI+HKADRwMUEokkuDS0lAA)

<details>
  <summary><b>Using hooks</b></summary>

Same as above but using hooks

```tsx
import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

type ModalProps = {
  children: ReactNode;
};

function Modal({ children }: ModalProps) {
  // create div element only once using ref
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) elRef.current = document.createElement("div");

  useEffect(() => {
    const el = elRef.current!; // non-null assertion because it will never be null
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, []);

  return createPortal(children, elRef.current);
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDGMA0cDecCuAzkgKIBmZSG2RSyZ2y6MAchACZJwC+cZUEEHADkUVBmEBYAFChIsXHDRiUMJAAVoMFABsefAUNHiYAWnaCp0mQHobcFIUL4QwAHYBzOO7gBPCPhQcAAWMCB6ZMA6XMGODnDswABucADuwDDB3uwiIBy6pgIQMMIA3DJoEG6E8HnsuggQxXAAvAkQaC5IbjAAdACO+EhQvgDKSNEY0AAUAEQAxHUFRTCzAJQOhHAAEgAqALIAMiTRIN0w5dbSML5gXPv5OuoCYFttODJwSsFR7GJuAC5ECY2JxLtxLjIyPg3BhgFU4A96jppng0D8dH9ujwgUjdM8IK8Nh9pF87EoVGoEsk4BMkGcenAqjpfEzYVwiO4vGIyJ8lFUarSdPRWgRiPQADx7I4AEWSJ3p5zgAB84G58DodAA+abqzVrS5fYBkODTACEE3ovU6UH+MA2lqQZGtgTtoosnQZfWUqDUCq9c0SSXWkNJYtIFCoMGm0w2LS1uD5X0q1XgE1FjudNrtZtKcHJbiqpj1ekcxFg8LccAARlQULRvPB0pq1UgksMa1wS0m4EthU0+igwHc3OwAMIY9jTCYGntiGCBKux1oJklfde9x6NYq9MR5dsT37TnSzsNfCF87jYADaAF1T3z54uKb6NFpdNN0b9-thMy7becp7cDIIHSOSRAoB4SCgdCsIwJWcAAILDsua78qmcDXoQwQQKkeI6NgxAwKMOF4Y8t6ikwGC9LQozaGo0xkLoxCnl8T5QEuPYSkGWo9mS9j+PgSgoFWzEQHAYD4PAmTAFsPiCUENSqMAaAhGEERRNBZ7rtxNLAOwLSzH2hQDrMWoSjYPF8bg2G4fhcAAGQOaa1lfBK+G8dpG5uUGrneTUvjRC0OBod5YXUoQYA6CgvhArMHhQPpsyYH5YVRegSAAJJqCAhBxWg5zDMlqXecESDAB4oRxQAjAADLVSTBMVXnhV86TsJkQLCHVDXBMIKUta11boAA1glASjnFUAeMN0y1Zg82Lb01VrM1rVhQAXplo5IAAHkCACcB0Det67cMBg3rp5p1fJlwhCCgm7ImaOCzHAswXTdcAStWUkwAiAVBSFw1oGNAgwuwcVgEOvgoKkPxgB9vBVGOOgqSNwXLvGcBESRdmPIxzFIGs3BamgOgQMQFm-TA-1uNd60WVZl0WR51kk9ZP1-QiKNo6DmNxgmuOkfh0wwFAQwk1qtmpIijzU9z9PWeSYiChAJoKQ4w5cZZyQM2sMjcEAA)

</details>

Modal Component Usage Example:

```tsx
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      // you can also put this in your static html file
      <div id="modal-root"></div>
      {showModal && (
        <Modal>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              height: "100vh",
              width: "100vh",
              background: "rgba(0,0,0,0.1)",
              zIndex: 99,
            }}
          >
            I'm a modal!{" "}
            <button
              style={{ background: "papyawhip" }}
              onClick={() => setShowModal(false)}
            >
              close
            </button>
          </div>
        </Modal>
      )}
      <button onClick={() => setShowModal(true)}>show Modal</button>
      // rest of your app
    </div>
  );
}
```

<details>

<summary><b>Context of Example</b></summary>

This example is based on the [Event Bubbling Through Portal](https://reactjs.org/docs/portals.html#event-bubbling-through-portals) example of React docs.

</details>

<!--END-SECTION:portals-->

<!--START-SECTION:error-boundaries-->

#### Error Boundaries

##### Option 1: Using react-error-boundary

[React-error-boundary](https://github.com/bvaughn/react-error-boundary) - is a lightweight package ready to use for this scenario with TS support built-in.
This approach also lets you avoid class components that are not that popular anymore.

##### Option 2: Writing your custom error boundary component

If you don't want to add a new npm package for this, you can also write your own `ErrorBoundary` component.

```jsx
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

```

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

<!--END-SECTION:error-boundaries-->

<!--START-SECTION:concurrent-->

#### Concurrent React/React Suspense

_Not written yet._ watch <https://github.com/sw-yx/fresh-async-react> for more on React Suspense and Time Slicing.

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

<!--END-SECTION:concurrent-->

<!--START-SECTION:types-->

### Troubleshooting Handbook: Types

> ⚠️ Have you read [the TypeScript FAQ](https://github.com/microsoft/TypeScript/wiki/FAQ?) Your answer might be there!

Facing weird type errors? You aren't alone. This is the hardest part of using TypeScript with React. Be patient - you are learning a new language after all. However, the more you get good at this, the less time you'll be working _against_ the compiler and the more the compiler will be working _for_ you!

Try to avoid typing with `any` as much as possible to experience the full benefits of TypeScript. Instead, let's try to be familiar with some of the common strategies to solve these issues.

#### Union Types and Type Guarding

Union types are handy for solving some of these typing problems:

```tsx
class App extends React.Component<
  {},
  {
    count: number | null; // like this
  }
> {
  state = {
    count: null,
  };
  render() {
    return <div onClick={() => this.increment(1)}>{this.state.count}</div>;
  }
  increment = (amt: number) => {
    this.setState((state) => ({
      count: (state.count || 0) + amt,
    }));
  };
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BBMMOJADxiQDsATRsnQwAdAGFckHrxgAeCnDgBvAL4AaBcs2K0EAK48YALjg89IAEZIocAD6m91agG44AejdxqwANZI4MAAWwHSaKhQAfFrkinQwKNxwALzRijr6hiZmTmHOmkT81gAUAJSpaUQwelA8cLJ8wABucBA8Yt5oPklKpclRQSEiwDxoRCAyRQCMJSoRSgN0InEJSCK6BjAqsm4NjRF5MXDhh8OjSOOGyXBFKCDGDpbWZUlRStoBwYt0SDAAyvHcIrLRIva5vQ5pODrTLXYGraHwWz2AAMZQA1HBbjB3ioSiUDooVAcVEA)

**Type Guarding**: Sometimes Union Types solve a problem in one area but create another downstream. If `A` and `B` are both object types, `A | B` isn't "either A or B", it is "A or B or both at once", which causes some confusion if you expected it to be the former. Learn how to write checks, guards, and assertions (also see the Conditional Rendering section below). For example:

```ts
interface Admin {
  role: string;
}
interface User {
  email: string;
}

// Method 1: use `in` keyword
function redirect(user: Admin | User) {
  if ("role" in user) {
    // use the `in` operator for typeguards since TS 2.7+
    routeToAdminPage(user.role);
  } else {
    routeToHomePage(user.email);
  }
}

// Method 2: custom type guard, does the same thing in older TS versions or where `in` isnt enough
function isAdmin(user: Admin | User): user is Admin {
  return (user as any).role !== undefined;
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoC4AOxiSk3STgEEATEGuAbwrjhwAbJAC44AZxhQaAcwDcFAL5Va9RmmYBVcfR584SECmCCxk6dXlKKFTAFdqGYBGoCIdugBUI7TtQAKKDJIABTiwDLUwJjA9ACUeuT80XBhEVExugC8OQR2OlAIEML4CbxJ-AJIMHZQrvi+NGQVinDWlOT2jjDOrjgeSN4AErhIgcFpkdGxUGX6KZMZM3A5WQSGxoKliZVVNXUEIyBIYEFIzfzK5FcUAPS3cACy1QAWEGxwAIxi+cwABjQ-nAANZIACeAHdoGxbA4nC4qmxgEQMCFflAxI1XAAfODaeI7ODREIAIiESBJRNc6LKcHucF+cBgL3+gLgEDA9BQMGgcEwvJgYM5MjsKCgbHEEhoGjgngAynAAEwAOgA7ABqfT8fpeHwcGjjULo5XkuIKFoGQQ6Qna9y6o5jM5ogrKjYmM36K43cj057M95KsRofI8vCCzlwEVitgAGjgbAgSElzOY4hQxyZL1kVPZgjYunlcAAbvRwi5JbyISyiHAAdQgcBxLQDNR3DIXrDur0ieIsc76Jj9Ti8QU4j8Cj3WEPCUR9q5+1A4ChJShqGC4ibiswAIS5Bz5mLUJAw65AA)

Method 2 is also known as [User-Defined Type Guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) and can be really handy for readable code. This is how TS itself refines types with `typeof` and `instanceof`.

If you need `if...else` chains or the `switch` statement instead, it should "just work", but look up [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) if you need help. (See also: [Basarat's writeup](https://basarat.gitbook.io/typescript/type-system/discriminated-unions)). This is handy in typing reducers for `useReducer` or Redux.

#### Optional Types

If a component has an optional prop, add a question mark and assign during destructure (or use defaultProps).

```tsx
class MyComponent extends React.Component<{
  message?: string; // like this
}> {
  render() {
    const { message = "default" } = this.props;
    return <div>{message}</div>;
  }
}
```

You can also use a `!` character to assert that something is not undefined, but this is not encouraged.

_Something to add? [File an issue](https://github.com/typescript-cheatsheets/react/issues/new) with your suggestions!_

#### Enum Types

**We recommend avoiding using enums as far as possible**.

Enums have a few [documented issues](https://fettblog.eu/tidy-typescript-avoid-enums/) (the TS team [agrees](https://twitter.com/orta/status/1348966323271987201?s=20)). A simpler alternative to enums is just declaring a union type of string literals:

```tsx
export declare type Position = "left" | "right" | "top" | "bottom";
```

If you must use enums, remember that enums in TypeScript default to numbers. You will usually want to use them as strings instead:

```tsx
export enum ButtonSizes {
  default = "default",
  small = "small",
  large = "large",
}

// usage
export const PrimaryButton = (
  props: Props & React.HTMLProps<HTMLButtonElement>
) => <Button size={ButtonSizes.default} {...props} />;
```

#### Type Assertion

Sometimes you know better than TypeScript that the type you're using is narrower than it thinks, or union types need to be asserted to a more specific type to work with other APIs, so assert with the `as` keyword. This tells the compiler you know better than it does.

```tsx
class MyComponent extends React.Component<{
  message: string;
}> {
  render() {
    const { message } = this.props;
    return (
      <Component2 message={message as SpecialMessageType}>{message}</Component2>
    );
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCmATzCTgGU61gUAbAWSQGduUBzJABVa9ALwFuMKMAB2-fAG4KFOTCRRM6egAUcYbnADeFOHBA8+ggFxwpM+XAA+cAK6yAJkkxykH5eQAvirkaBCyUnAAwriQskiyMABMtsjoMAB0AGJRADx6EAYAfHASABRG5pYCSIEAlKUlZaZwuR7AAG5FLWa5ABYAjEVGFrw1gbkA9IPd5L2T7V0UdSFobCi8cBzUMeDhCfBIAB7qnoZpGBm7cQe5JnNVYzZ20nL8AYEl92ZEnhplDW+ZjgYQi8Eqoys9ECpTgMD6wG4GTA+m4AWBcCIMFcUFkcGaDwxuWu+0SSUeULEI2qgjgG0YzFYnBpwlEn2pT1qUxJ8TJswxdXRcGCQSAA)

Note that you cannot assert your way to anything - basically it is only for refining types. Therefore it is not the same as "casting" a type.

You can also assert a property is non-null, when accessing it:

```ts
element.parentNode!.removeChild(element); // ! before the period
myFunction(document.getElementById(dialog.id!)!); // ! after the property accessing
let userID!: string; // definite assignment assertion... be careful!
```

Of course, try to actually handle the null case instead of asserting :)

#### Simulating Nominal Types

TS' structural typing is handy, until it is inconvenient. However you can simulate nominal typing with [`type branding`](https://basarat.gitbook.io/typescript/main-1/nominaltyping):

```ts
type OrderID = string & { readonly brand: unique symbol };
type UserID = string & { readonly brand: unique symbol };
type ID = OrderID | UserID;
```

We can create these values with the Companion Object Pattern:

```ts
function OrderID(id: string) {
  return id as OrderID;
}
function UserID(id: string) {
  return id as UserID;
}
```

Now TypeScript will disallow you from using the wrong ID in the wrong place:

```ts
function queryForUser(id: UserID) {
  // ...
}
queryForUser(OrderID("foobar")); // Error, Argument of type 'OrderID' is not assignable to parameter of type 'UserID'
```

In future you can use the `unique` keyword to brand. [See this PR](https://github.com/microsoft/TypeScript/pull/33038).

#### Intersection Types

Adding two types together can be handy, for example when your component is supposed to mirror the props of a native component like a `button`:

```tsx
export interface PrimaryButtonProps {
  label: string;
}
export const PrimaryButton = (
  props: PrimaryButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  // do custom buttony stuff
  return <button {...props}> {props.label} </button>;
};
```

_Playground [here](https://www.typescriptlang.org/play?ssl=4&ssc=1&pln=12&pc=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCipAD0ljmADsYkpN0k4AFKUFKAE8AQgFcYMCE14QwAZzgBvCnDgAbFACMkagFxw5MPkwDmAbgoBfanWjw0Uwzz4gBI8ZKZwAvHAAUKnBgOPL6vPxCYhJSMvJwAGSIxDAAdFGeABIAKgCyADIAghJ8muJIcgA82fnpUgCiakggSCwAfBQAlD6tSoEA9H1wACYQcGiihrhwpdFMggYwopiYgUSLUF4VM55KKXvBsnKWPYoH8ika2mqWcBV921KtFuSWQA)_

You can also use Intersection Types to make reusable subsets of props for similar components:

```tsx
type BaseProps = {
   className?: string,
   style?: React.CSSProperties
   name: string // used in both
}
type DogProps = {
  tailsCount: number
}
type HumanProps = {
  handsCount: number
}
export const Human = (props: BaseProps & HumanProps) => // ...
export const Dog = (props: BaseProps & DogProps) => // ...
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCmATzCTgCEUBnJABRzGbgF44BvCnGFoANi2YA5FCCQB+AFxxmMKMAB2AcwA0Q4Suqj5S5OhgA6AMIBlaxwh1YwJMz1x1MpEpVqtcAPT+cACurAAmcBpwAEYQMAAWFAC+VLT0ACIQmvZcvAJ6MCjAosyWEMHqMErqwSDRSFDJqXRwABK1KOo53HyC5MLxnWGl5ZXVtfWN5CnkSAAekLBwaBDqKm0d6ibEFgBilgA8TKzdcABkGyCd3QB8eQAUAJS8d-d6B2HAAG4BNxSPFAo80W8BWa3gmU02zM5n2RxY7E43AukNuD2ePFe70+P38f3IjyAA)

Make sure not to confuse Intersection Types (which are **and** operations) with Union Types (which are **or** operations).

#### Union Types

This section is yet to be written (please contribute!). Meanwhile, see our [commentary on Union Types usecases](https://github.com/typescript-cheatsheets/react/blob/main/README.md#union-types-and-type-guarding).

The ADVANCED cheatsheet also has information on Discriminated Union Types, which are helpful when TypeScript doesn't seem to be narrowing your union type as you expect.

#### Overloading Function Types

Specifically when it comes to functions, you may need to overload instead of union type. The most common way function types are written uses the shorthand:

```ts
type FunctionType1 = (x: string, y: number) => number;
```

But this doesn't let you do any overloading. If you have the implementation, you can put them after each other with the function keyword:

```ts
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x): any {
  // implementation with combined signature
  // ...
}
```

However, if you don't have an implementation and are just writing a `.d.ts` definition file, this won't help you either. In this case you can forego any shorthand and write them the old-school way. The key thing to remember here is as far as TypeScript is concerned, `functions are just callable objects with no key`:

```ts
type pickCard = {
  (x: { suit: string; card: number }[]): number;
  (x: number): { suit: string; card: number };
  // no need for combined signature in this form
  // you can also type static properties of functions here eg `pickCard.wasCalled`
};
```

Note that when you implement the actual overloaded function, the implementation will need to declare the combined call signature that you'll be handling, it won't be inferred for you. You can readily see examples of overloads in DOM APIs, e.g. `createElement`.

[Read more about Overloading in the Handbook.](https://www.typescriptlang.org/docs/handbook/functions.html#overloads)

#### Using Inferred Types

Leaning on TypeScript's Type Inference is great... until you realize you need a type that was inferred, and have to go back and explicitly declare types/interfaces so you can export them for reuse.

Fortunately, with `typeof`, you won't have to do that. Just use it on any value:

```tsx
const [state, setState] = useState({
  foo: 1,
  bar: 2,
}); // state's type inferred to be {foo: number, bar: number}

const someMethod = (obj: typeof state) => {
  // grabbing the type of state even though it was inferred
  // some code using obj
  setState(obj); // this works
};
```

#### Using Partial Types

Working with slicing state and props is common in React. Again, you don't really have to go and explicitly redefine your types if you use the `Partial` generic type:

```tsx
const [state, setState] = useState({
  foo: 1,
  bar: 2,
}); // state's type inferred to be {foo: number, bar: number}

// NOTE: stale state merging is not actually encouraged in useState
// we are just demonstrating how to use Partial here
const partialStateUpdate = (obj: Partial<typeof state>) =>
  setState({ ...state, ...obj });

// later on...
partialStateUpdate({ foo: 2 }); // this works
```

<details>
<summary><b>Minor caveats on using <code>Partial</code></b></summary>

Note that there are some TS users who don't agree with using `Partial` as it behaves today. See [subtle pitfalls of the above example here](https://twitter.com/ferdaber/status/1084798596027957248), and check out this long discussion on [why @types/react uses Pick instead of Partial](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18365).

</details>

#### The Types I need weren't exported!

This can be annoying but here are ways to grab the types!

- Grabbing the Prop types of a component: Use `React.ComponentProps` and `typeof`, and optionally `Omit` any overlapping types

```tsx
import { Button } from "library"; // but doesn't export ButtonProps! oh no!
type ButtonProps = React.ComponentProps<typeof Button>; // no problem! grab your own!
type AlertButtonProps = Omit<ButtonProps, "onClick">; // modify
const AlertButton = (props: AlertButtonProps) => (
  <Button onClick={() => alert("hello")} {...props} />
);
```

You may also use [`ComponentPropsWithoutRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L774) (instead of ComponentProps) and [`ComponentPropsWithRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L770) (if your component specifically forwards refs)

- Grabbing the return type of a function: use `ReturnType`:

```tsx
// inside some library - return type { baz: number } is inferred but not exported
function foo(bar: string) {
  return { baz: 1 };
}

//  inside your app, if you need { baz: number }
type FooReturn = ReturnType<typeof foo>; // { baz: number }
```

In fact you can grab virtually anything public: [see this blogpost from Ivan Koshelev](http://ikoshelev.azurewebsites.net/search/id/11/Pragmatic-uses-of-TypeScript-type-system-My-type-of-type)

```ts
function foo() {
  return {
    a: 1,
    b: 2,
    subInstArr: [
      {
        c: 3,
        d: 4,
      },
    ],
  };
}

type InstType = ReturnType<typeof foo>;
type SubInstArr = InstType["subInstArr"];
type SubInstType = SubInstArr[0];

let baz: SubInstType = {
  c: 5,
  d: 6, // type checks ok!
};

//You could just write a one-liner,
//But please make sure it is forward-readable
//(you can understand it from reading once left-to-right with no jumps)
type SubInstType2 = ReturnType<typeof foo>["subInstArr"][0];
let baz2: SubInstType2 = {
  c: 5,
  d: 6, // type checks ok!
};
```

- TS also ships with a `Parameters` utility type for extracting the parameters of a function
- for anything more "custom", the `infer` keyword is the basic building block for this, but takes a bit of getting used to. Look at the source code for the above utility types, and [this example](https://twitter.com/mgechev/status/1211030455224422401?s=20) to get the idea. Basarat [also has a good video on `infer`](https://www.youtube.com/watch?v=ijK-1R-LFII&list=PLYvdvJlnTOjF6aJsWWAt7kZRJvzw-en8B&index=3&t=0s).

#### The Types I need don't exist!

What's more annoying than modules with unexported types? Modules that are **untyped**!

> Before you proceed - make sure you have checked that types don't exist in [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) or [TypeSearch](https://microsoft.github.io/TypeSearch/)

Fret not! There are more than a couple of ways in which you can solve this problem.

##### Slapping `any` on everything

A **lazier** way would be to create a new type declaration file, say `typedec.d.ts`– if you don't already have one. Ensure that the path to file is resolvable by TypeScript by checking the `include` array in the `tsconfig.json` file at the root of your directory.

```json
// inside tsconfig.json
{
  // ...
  "include": [
    "src" // automatically resolves if the path to declaration is src/typedec.d.ts
  ]
  // ...
}
```

Within this file, add the `declare` syntax for your desired module, say `my-untyped-module`– to the declaration file:

```ts
// inside typedec.d.ts
declare module "my-untyped-module";
```

This one-liner alone is enough if you just need it to work without errors. A even hackier, write-once-and-forget way would be to use `"*"` instead which would then apply the `Any` type for all existing and future untyped modules.

This solution works well as a workaround if you have less than a couple untyped modules. Anything more, you now have a ticking type-bomb in your hands. The only way of circumventing this problem would be to define the missing types for those untyped modules as explained in the following sections.

##### Autogenerate types

You can use TypeScript with `--allowJs` and `--declaration` to see TypeScript's "best guess" at the types of the library.

If this doesn't work well enough, use [`dts-gen`](https://github.com/Microsoft/dts-gen) to use the runtime shape of the object to accurately enumerate all available properties. This tends to be very accurate, BUT the tool does not yet support scraping JSDoc comments to populate additional types.

```bash
npm install -g dts-gen
dts-gen -m <your-module>
```

There are other automated JS to TS conversion tools and migration strategies - see [our MIGRATION cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/migration/from_js).

##### Typing Exported Hooks

Typing Hooks is just like typing pure functions.

The following steps work under two assumptions:

- You have already created a type declaration file as stated earlier in the section.
- You have access to the source code - specifically the code that directly exports the functions you will be using. In most cases, it would be housed in an `index.js` file.
  Typically you need a minimum of **two** type declarations (one for **Input Prop** and the other for **Return Prop**) to define a hook completely. Suppose the hook you wish to type follows the following structure,

```js
// ...
const useUntypedHook = (prop) => {
  // some processing happens here
  return {
    /* ReturnProps */
  };
};
export default useUntypedHook;
```

then, your type declaration should most likely follow the following syntax.

```ts
declare module 'use-untyped-hook' {
  export interface InputProps { ... }   // type declaration for prop
  export interface ReturnProps { ... } // type declaration for return props
  export default function useUntypedHook(
    prop: InputProps
    // ...
  ): ReturnProps;
}
```

<details>
<summary><b>For instance, the <a href="https://github.com/donavon/use-dark-mode">useDarkMode hook</a> exports the functions that follows a similar structure.</b></summary>

```js
// inside src/index.js
const useDarkMode = (
  initialValue = false, // -> input props / config props to be exported
  {
    // -> input props / config props to be exported
    element,
    classNameDark,
    classNameLight,
    onChange,
    storageKey = "darkMode",
    storageProvider,
    global,
  } = {}
) => {
  // ...
  return {
    // -> return props to be exported
    value: state,
    enable: useCallback(() => setState(true), [setState]),
    disable: useCallback(() => setState(false), [setState]),
    toggle: useCallback(() => setState((current) => !current), [setState]),
  };
};
export default useDarkMode;
```

As the comments suggest, exporting these config props and return props following the aforementioned structure will result in the following type export.

```ts
declare module "use-dark-mode" {
  /**
   * A config object allowing you to specify certain aspects of `useDarkMode`
   */
  export interface DarkModeConfig {
    classNameDark?: string; // A className to set "dark mode". Default = "dark-mode".
    classNameLight?: string; // A className to set "light mode". Default = "light-mode".
    element?: HTMLElement; // The element to apply the className. Default = `document.body`
    onChange?: (val?: boolean) => void; // Override the default className handler with a custom callback.
    storageKey?: string; // Specify the `localStorage` key. Default = "darkMode". Set to `null` to disable persistent storage.
    storageProvider?: WindowLocalStorage; // A storage provider. Default = `localStorage`.
    global?: Window; // The global object. Default = `window`.
  }
  /**
   * An object returned from a call to `useDarkMode`.
   */
  export interface DarkMode {
    readonly value: boolean;
    enable: () => void;
    disable: () => void;
    toggle: () => void;
  }
  /**
   * A custom React Hook to help you implement a "dark mode" component for your application.
   */
  export default function useDarkMode(
    initialState?: boolean,
    config?: DarkModeConfig
  ): DarkMode;
}
```

</details>

##### Typing Exported Components

In case of typing untyped class components, there's almost no difference in approach except for the fact that after declaring the types, you export the extend the type using `class UntypedClassComponent extends React.Component<UntypedClassComponentProps, any> {}` where `UntypedClassComponentProps` holds the type declaration.

For instance, [sw-yx's Gist on React Router 6 types](https://gist.github.com/sw-yx/37a6a3d248c2d4031801f0d568904df8) implemented a similar method for typing the then untyped RR6.

```ts
declare module "react-router-dom" {
  import * as React from 'react';
  // ...
  type NavigateProps<T> = {
    to: string | number,
    replace?: boolean,
    state?: T
  }
  //...
  export class Navigate<T = any> extends React.Component<NavigateProps<T>>{}
  // ...
```

For more information on creating type definitions for class components, you can refer to this [post](https://templecoding.com/blog/2016/03/31/creating-typescript-typings-for-existing-react-components) for reference.

#### Frequent Known Problems with TypeScript

Just a list of stuff that React developers frequently run into, that TS has no solution for. Not necessarily TSX only.

##### TypeScript doesn't narrow after an object element null check

[![https://pbs.twimg.com/media/E0u6b9uUUAAgwAk?format=jpg&name=medium](https://pbs.twimg.com/media/E0u6b9uUUAAgwAk?format=jpg&name=medium)](https://mobile.twitter.com/tannerlinsley/status/1390409931627499523)

Ref: https://mobile.twitter.com/tannerlinsley/status/1390409931627499523. see also https://github.com/microsoft/TypeScript/issues/9998

##### TypeScript doesn't let you restrict the type of children

Guaranteeing typesafety for this kind of API isn't possible:

```tsx
<Menu>
  <MenuItem/> {/* ok */}
  <MenuLink/> {/* ok */}
  <div> {/* error */}
</Menu>
```

Source: https://twitter.com/ryanflorence/status/1085745787982700544?s=20

<!--END-SECTION:types-->

<!--START-SECTION:operators-->

### Troubleshooting Handbook: Operators

- `typeof` and `instanceof`: type query used for refinement
- `keyof`: get keys of an object. `keyof T` is an operator to tell you what values of `k` can be used for `obj[k]`.
  - [Some misconceptions here](https://twitter.com/SeaRyanC/status/1418678670739218438?s=20).
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
- Basarat's video https://www.youtube.com/watch?v=SbVgPQDealg&list=PLYvdvJlnTOjF6aJsWWAt7kZRJvzw-en8B&index=2&t=0s
- [Generics, Conditional types and Mapped types](https://www.youtube.com/watch?v=PJjeHzvi_VQ&feature=youtu.be)

<!--END-SECTION:operators-->

<!--START-SECTION:utilities-->

### Troubleshooting Handbook: Utilities

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

<!--END-SECTION:utilities-->

<!--START-SECTION:ts-config-->

### Troubleshooting Handbook: tsconfig.json

You can find [all the Compiler options in the TypeScript docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html). [The new TS docs also has per-flag annotations of what each does](https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports). This is the setup I roll with for APPS (not libraries - for libraries you may wish to see the settings we use in `tsdx`):

```json
{
  "compilerOptions": {
    "incremental": true,
    "outDir": "build/lib",
    "target": "es5",
    "module": "esnext",
    "lib": ["DOM", "ESNext"],
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

You can find more [recommended TS config here](https://github.com/tsconfig/bases).

Please open an issue and discuss if there are better recommended choices for React.

Selected flags and why we like them:

- `esModuleInterop`: disables namespace imports (`import * as foo from "foo"`) and enables CJS/AMD/UMD style imports (`import fs from "fs"`)
- `strict`: `strictPropertyInitialization` forces you to initialize class properties or explicitly declare that they can be undefined. You can opt out of this with a definite assignment assertion.
- `"typeRoots": ["./typings", "./node_modules/@types"]`: By default, TypeScript looks in `node_modules/@types` and parent folders for third party type declarations. You may wish to override this default resolution so you can put all your global type declarations in a special `typings` folder.

Compilation time grows linearly with size of codebase. For large projects, you will want to use [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html). See our [ADVANCED](https://react-typescript-cheatsheet.netlify.app/docs/advanced) cheatsheet for commentary.

<!--END-SECTION:ts-config-->

<!--START-SECTION:official-typings-bugs-->

### Troubleshooting Handbook: Fixing bugs in official typings

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

<!--END-SECTION:official-typings-bugs-->

<!--START-SECTION:non-ts-files-->

### Troubleshooting Handbook: Globals, Images and other non-TS files

Use [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).

If, say, you are using a third party JS script that attaches on to the `window` global, you can extend `Window`:

```ts
declare global {
  interface Window {
    MyVendorThing: MyVendorType;
  }
}
```

Likewise if you wish to "import" an image or other non TS/TSX file:

```ts
// declaration.d.ts
// anywhere in your project, NOT the same name as any of your .ts/tsx files
declare module "*.png";

// importing in a tsx file
import * as logo from "./logo.png";
```

Note that `tsc` cannot bundle these files for you, you will have to use Webpack or Parcel.

Related issue: https://github.com/Microsoft/TypeScript-React-Starter/issues/12 and [StackOverflow](https://stackoverflow.com/a/49715468/4216035)

<!--END-SECTION:non-ts-files-->

<!--START-SECTION:editor-integration-->

### Editor Tooling and Integration

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

You are free to use this repo's TSX logo if you wish:

[![https://user-images.githubusercontent.com/6764957/53868378-2b51fc80-3fb3-11e9-9cee-0277efe8a927.png](https://user-images.githubusercontent.com/6764957/53868378-2b51fc80-3fb3-11e9-9cee-0277efe8a927.png)](https://user-images.githubusercontent.com/6764957/53868378-2b51fc80-3fb3-11e9-9cee-0277efe8a927.png)

You may also wish to use alternative logos - [jsx-tsx-logos](https://github.com/Protectator/jsx-tsx-logos)

![https://github.com/Protectator/jsx-tsx-logos/raw/master/example.png](https://github.com/Protectator/jsx-tsx-logos/raw/master/example.png)

<!--END-SECTION:editor-integration-->

<!--START-SECTION:linting-->

### Linting

> ⚠️Note that [TSLint is now in maintenance and you should try to use ESLint instead](https://medium.com/palantir/tslint-in-2019-1a144c2317a9). If you are interested in TSLint tips, please check this PR from [@azdanov](https://github.com/typescript-cheatsheets/react/pull/14). The rest of this section just focuses on ESLint. [You can convert TSlint to ESlint with this tool](https://github.com/typescript-eslint/tslint-to-eslint-config).

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

Wes Bos is also working on [TypeScript support for his eslint+prettier config.](https://github.com/wesbos/eslint-config-wesbos/issues/68)

If you're looking for information on Prettier, check out the [Prettier](https://github.com/typescript-cheatsheets/react/blob/main/docs/advanced/misc-concerns.md#prettier) guide.

<!--END-SECTION:linting-->

<!--START-SECTION:resources-->

### Other React + TypeScript resources

- me! <https://twitter.com/swyx>
- https://www.freecodecamp.org/news/how-to-build-a-todo-app-with-react-typescript-nodejs-and-mongodb/
- <https://github.com/piotrwitek/react-redux-typescript-guide> - **HIGHLY HIGHLY RECOMMENDED**, i wrote this repo before knowing about this one, this has a lot of stuff I don't cover, including **REDUX** and **JEST**.
- [10 Bad TypeScript Habits](https://startup-cto.net/10-bad-typescript-habits-to-break-this-year/):
  1. not using `"strict": true`
  2. using `||` for default values when we have `??`
  3. Using `any` instead of `unknown` for API responses
  4. using `as` assertion instead of Type Guards (`function isFoo(obj: unknown): obj is Foo {}`)
  5. `as any` in tests
  6. Marking optional properties instead of modeling which combinations exist by extending interfaces
  7. One letter generics
  8. Non-boolean `if (nonboolean)` checks
  9. bangbang checks `if (!!nonboolean)`
  10. `!= null` to check for `null` and `undefined`
- [Ultimate React Component Patterns with TypeScript 2.8](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)
- [Basarat's TypeScript gitbook has a React section](https://basarat.gitbook.io/typescript/tsx/react) with an [Egghead.io course](https://egghead.io/courses/use-typescript-to-develop-react-applications) as well.
- [Palmer Group's TypeScript + React Guidelines](https://github.com/palmerhq/typescript) as well as Jared's other work like [disco.chat](https://github.com/jaredpalmer/disco.chat)
- [Sindre Sorhus' TypeScript Style Guide](https://github.com/sindresorhus/typescript-definition-style-guide)
- [TypeScript React Starter Template by Microsoft](https://github.com/Microsoft/TypeScript-React-Starter) A starter template for TypeScript and React with a detailed README describing how to use the two together. Note: this doesn't seem to be frequently updated anymore.
- [Steve Kinney's React and TypeScript course on Frontend Masters (paid)](https://frontendmasters.com/courses/react-typescript/)
- [Brian Holt's Intermediate React course on Frontend Masters (paid)](https://frontendmasters.com/courses/intermediate-react/converting-the-app-to-typescript/) - Converting App To TypeScript Section
- [Mike North's Production TypeScript course on Frontend Masters (paid)](https://frontendmasters.com/courses/production-typescript/)
- [TSX Guide](https://jenil.github.io/chota/) by [gojutin](https://github.com/gojutin/www.tsx.guide)
- TypeScript conversion:
  - [Lyft's React-To-TypeScript conversion CLI](https://github.com/lyft/react-javascript-to-typescript-transform)
  - [Gustav Wengel's blogpost - converting a React codebase to TypeScript](http://www.gustavwengel.dk/converting-typescript-to-javascript-part-1)
  - [Microsoft React TypeScript conversion guide](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide)
- [Matt Pocock's Beginner's Typescript Tutorial](https://github.com/total-typescript/beginners-typescript-tutorial)
- [Matt Pocock's React with TypeScript Tutorial](https://www.totaltypescript.com/tutorials/react-with-typescript)
- [You?](https://github.com/typescript-cheatsheets/react/issues/new).

<!--END-SECTION:resources-->

<!--START-SECTION:talks-->

### Recommended React + TypeScript talks

- [Ultimate React Component Patterns with TypeScript](https://www.youtube.com/watch?v=_PBQ3if6Fmg), by Martin Hochel, GeeCon Prague 2018
- [How to Build React Apps with TypeScript](https://youtu.be/LJzGGmu5APA?si=YNzy7T_8yj7TuXxS), by ClearEdge Tech Talk 2022
- [Create a More Readable React Codebase Using TypeScript](https://youtu.be/nkJbGgieALI?si=IFZZIMEiXz7AsiBv), by Emma Brillhart 2019
- Please help contribute to this new section!

<!--END-SECTION:talks-->

<!--START-SECTION:learn-ts-->

### Time to Really Learn TypeScript

Believe it or not, we have only barely introduced TypeScript here in this cheatsheet. If you are still facing TypeScript troubleshooting issues, it is likely that your understanding of TS is still too superficial.

There is a whole world of generic type logic that you will eventually get into, however it becomes far less dealing with React than just getting good at TypeScript so it is out of scope here. But at least you can get productive in React now :)

It is worth mentioning some resources to help you get started:

- Step through the 40+ examples under [the playground's](http://www.typescriptlang.org/play/index.html) Examples section, written by @Orta
- Anders Hejlsberg's overview of TS: https://www.youtube.com/watch?v=ET4kT88JRXs
- Marius Schultz: https://blog.mariusschulz.com/series/typescript-evolution with an [Egghead.io course](https://egghead.io/courses/advanced-static-types-in-typescript)
- Basarat's Deep Dive: https://basarat.gitbook.io/typescript/
- Axel Rauschmeyer's [Tackling TypeScript](https://exploringjs.com/tackling-ts/)
- Rares Matei: [Egghead.io course](https://egghead.io/courses/practical-advanced-typescript)'s advanced TypeScript course on Egghead.io is great for newer typescript features and practical type logic applications (e.g. recursively making all properties of a type `readonly`)
- Learn about [Generics, Conditional types and Mapped types](https://www.youtube.com/watch?v=PJjeHzvi_VQ&feature=youtu.be)
- Shu Uesugi: [TypeScript for Beginner Programmers](https://ts.chibicode.com/)
- Here is another [TypeScript Error Guide](https://github.com/threehams/typescript-error-guide/) that you can check for your errors.

<!--END-SECTION:learn-ts-->

<!--START-SECTION:examples-->

### Example App

- [Create React App TypeScript Todo Example 2021](https://github.com/laststance/create-react-app-typescript-todo-example-2021)
- [Ben Awad's 14 hour Fullstack React/GraphQL/TypeScript Tutorial](https://www.youtube.com/watch?v=I6ypD7qv3Z8)
- [Cypress Realworld App](https://github.com/cypress-io/cypress-realworld-app)

<!--END-SECTION:examples-->

## My question isn't answered here!

- [File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).

## Contributors

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. See [CONTRIBUTORS.md](/CONTRIBUTORS.md) for the full list. Contributions of any kind welcome!
