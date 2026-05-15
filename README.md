# React TypeScript Cheatsheet

Cheatsheet for using React with TypeScript.

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
[Contribute!](https://github.com/typescript-cheatsheets/react/blob/main/CONTRIBUTING.md) |
[Ask!](https://github.com/typescript-cheatsheets/react/issues/new/choose)

:wave: This repo is maintained by [@eps1lon](https://twitter.com/sebsilbermann) and [@filiptammergard](https://twitter.com/tammergard). We're so happy you want to try out React with TypeScript! If you see anything wrong or missing, please [file an issue](https://github.com/typescript-cheatsheets/react/issues/new/choose)! :+1:

---

[![All Contributors](https://img.shields.io/github/contributors/typescript-cheatsheets/react-typescript-cheatsheet?color=orange&style=flat-square)](/CONTRIBUTORS.md) | [![Discord](https://img.shields.io/discord/508357248330760243.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/wTGS5z9)

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
- [The HOC Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/hoc) specifically teaches people to write HOCs with examples.
  - Familiarity with [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) is necessary.
  - ⚠️This is the newest cheatsheet, all assistance is welcome.

---

## Basic Cheatsheet

### Basic Cheatsheet Table of Contents

<details>

<summary><b>Expand Table of Contents</b></summary>

- [React TypeScript Cheatsheet](#react-typescript-cheatsheet)
  - [Basic Cheatsheet](#basic-cheatsheet)
    - [Basic Cheatsheet Table of Contents](#basic-cheatsheet-table-of-contents)
    - [Section 1: Setup](#section-1-setup)
      - [Prerequisites](#prerequisites)
      - [React and TypeScript starter kits](#react-and-typescript-starter-kits)
      - [Try React and TypeScript online](#try-react-and-typescript-online)
    - [Section 2: Getting Started](#section-2-getting-started)
      - [Function Components](#function-components)
      - [Hooks](#hooks)
      - [useState](#usestate)
      - [useCallback](#usecallback)
      - [useReducer](#usereducer)
      - [useEffect / useLayoutEffect](#useeffect--uselayouteffect)
      - [useRef](#useref)
        - [Option 1: DOM element ref](#option-1-dom-element-ref)
        - [Option 2: Mutable value ref](#option-2-mutable-value-ref)
        - [See also](#see-also)
      - [useImperativeHandle](#useimperativehandle)
        - [See also:](#see-also-1)
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
        - [`object` as the non-primitive type](#object-as-the-non-primitive-type)
        - [Empty interface, `{}` and `Object`](#empty-interface--and-object)
      - [Useful React Prop Type Examples](#useful-react-prop-type-examples)
      - [Types or Interfaces?](#types-or-interfaces)
        - [TL;DR](#tldr)
        - [More Advice](#more-advice)
        - [Useful table for Types vs Interfaces](#useful-table-for-types-vs-interfaces)
  - [getDerivedStateFromProps](#getderivedstatefromprops)
    - [Forms and Events](#forms-and-events)
      - [List of event types](#list-of-event-types)
    - [Context](#context)
    - [Basic example](#basic-example)
    - [Without default context value](#without-default-context-value)
      - [Type assertion as an alternative](#type-assertion-as-an-alternative)
    - [forwardRef/createRef](#forwardrefcreateref)
    - [Generic forwardRefs](#generic-forwardrefs)
      - [Option 1 - Wrapper component](#option-1---wrapper-component)
      - [Option 2 - Redeclare forwardRef](#option-2---redeclare-forwardref)
      - [Option 3 - Call signature](#option-3---call-signature)
    - [More Info](#more-info)
    - [Portals](#portals)
    - [Error Boundaries](#error-boundaries)
      - [Option 1: Using react-error-boundary](#option-1-using-react-error-boundary)
      - [Option 2: Writing your custom error boundary component](#option-2-writing-your-custom-error-boundary-component)
    - [Concurrent React/React Suspense](#concurrent-reactreact-suspense)
    - [Linting](#linting)
  - [My question isn't answered here!](#my-question-isnt-answered-here)
  - [Contributors](#contributors)

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

If you just want a client-side single-page app without a framework, [Vite](https://vitejs.dev/) is the most common choice:

- [Vite](https://vitejs.dev/guide/): `npm create vite@latest my-app -- --template react-ts`

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

// You can choose to annotate the return type so an error is raised if you accidentally return some other type
const App = ({ message }: AppProps): React.JSX.Element => <div>{message}</div>;

// You can also inline the type declaration; eliminates naming the prop types, but looks repetitive
const App = ({ message }: { message: string }) => <div>{message}</div>;

// Alternatively, you can use `React.FunctionComponent` (or `React.FC`), if you prefer.
// With latest React types and TypeScript 5.1. it's mostly a stylistic choice, otherwise discouraged.
const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
  <div>{message}</div>
);
// or
const App: React.FC<AppProps> = ({ message }) => <div>{message}</div>;
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

If you need to use a complex type that you've relied on inference for, you can use `typeof` to capture the inferred type.

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

Therefore, the following code will yield "`Parameter 'e' implicitly has an 'any' type.`" error in React >= 18, but not &lt;17.

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

function reducer(
  state: typeof initialState,
  action: ACTIONTYPE
): typeof initialState {
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

<details>

<summary><b>Providing explicit types for <code>useReducer</code></b></summary>

In most cases, type inference for useReducer should work reliably. When inference fails, the state and action types can be explicitly provided using the following syntax, where the action type is wrapped in a single-element tuple.

```tsx
const [state, dispatch] = useReducer<typeof initialState, [ACTIONTYPE]>(
  reducer,
  initialState
);
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

`useRef` always returns a `RefObject<T>` in current `@types/react`. An initial value is required, and the returned `.current` is typed based on it. (`MutableRefObject` is deprecated and only kept for backwards compatibility.)

##### Option 1: DOM element ref

**To access a DOM element:** provide the element type as a generic and pass `null` as the initial value. React manages `.current` for you, and TypeScript expects you to pass this ref to an element's `ref` prop:

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

**To hold a mutable value across renders without re-rendering on change:** pass the initial value you want — React doesn't manage `.current` for you here, you write to it manually.

```tsx
function Foo() {
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      /* ... */
    }, 1000);
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <button
      onClick={() => {
        /* clearInterval the ref */
      }}
    >
      Cancel timer
    </button>
  );
}
```

##### See also

- [Related issue by @rajivpunjabi](https://github.com/typescript-cheatsheets/react/issues/388) - [Playground](https://www.typescriptlang.org/play#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcARFDvmQNwCwAUI7hAHarwCCYYcAvHAAUASn4A+OAG9GjOHAD0CBLLnKGcxHABiwKBzgQwMYGxS4WUACbBWAczgwIcSxFwBXEFlYxkxtgDoVTQBJVmBjZAAbOAA3KLcsOAB3YEjogCNE1jc0-zgAGQBPG3tHOAAVQrAsAGVcKGAjOHTCuDdUErhWNgBabLSUVFQsWBNWA2qoX2hA9VU4AGFKXyx0AFk3H3TIxOwCOAB5dIArLHwgpHcoSm84MGJJmFbgdG74ZcsDVkjC2Y01f7yFQsdjvLAEACM-EwVBg-naWD2AB4ABLlNb5GpgZCsACiO083jEgn6kQAhMJ6HMQfpKJCFpE2IkBNg8HCEci0RisTj8VhCTBiaSKVSVIoAaoLnBQuFgFFYvFEikBpkujkMps4FgAB7VfCdLmY7F4gleOFwAByEHg7U63VYfXVg2Go1MhhG0ygf3mAHVUtF6jgYLtwUdTvguta4Bstjs9mGznCpVcbvB7u7YM90B8vj9vYgLkDqWxaeCAEzQ1n4eHDTnoo2801EknqykyObii5SmpnNifA5GMZmCzWOwOJwudwC3xjKUyiLROKRBLJf3NLJO9KanV64xj0koVifQ08k38s1Sv0DJZBxIx5DbRGhk6J5Nua5mu4PEZPOAvSNgsgnxsHmXZzIgRZyDSYIEAAzJWsI1k+BCovWp58gKcAAD5qmkQqtqKHbyCexoYRecw7IQugcAs76ptCdIQv4KZmoRcjyMRaGkU28A4aSKiUXAwwgpYtEfrcAh0mWzF0ax7bsZx3Lceetx8eqAlYPAMAABa6KJskSXAdKwTJ4kwGxCjyKy-bfK05SrDA8mWVagHAbZeScOY0CjqUE6uOgqDaRAOSfKqOYgb8KiMaZ9GSeCEIMkyMVyUwRHWYc7nSvAgUQEk6AjMQXpReWyWGdFLHeBZHEuTCQEZT8xVwaV8BxZCzUWZQMDvuMghBHASJVnCWhTLYApiH1chIqgxpGeCfCSIxAC+Yj3o+8YvvgSLyNNOLjeBGhTTNdLzVJy3reGMBbTtrB7RoB3XbNBAneCsHLatcbPhdV3GrdB1WYhw3IKNZq-W2DCLYRO7QPAljgsgORcDwVJAA)
- [Example from Stefan Baumgartner](https://fettblog.eu/typescript-react/hooks/#useref) - [Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgIilQ3wFgAoCzAVwDsNgJa4AVJADxgElaxqYA6sBgALAGIQ01AM4AhfjCYAKAJRwA3hThwA9DrjBaw4CgA2waUjgB3YSLi1qp0wBo4AI35wYSZ6wCeYEgAymhQwGDw1lYoRHCmEBAA1oYA5nCY0HAozAASLACyADI8fDAAoqZIIEi0MFpwaEzS8IZllXAAvIjEMAB0MkjImAA8+cWl-JXVtTAAfEqOzioA3A1NtC1wTPIwirQAwuZoSV1wql1zGg3aenAt4RgOTqaNIkgn0g5ISAAmcDJvBA3h9TsBMAZeFNXjl-lIoEQ6nAOBZ+jddPpPPAmGgrPDEfAUS1pG5hAYvhAITBAlZxiUoRUqjU6m5RIDhOi7iIUF9RFYaqIIP9MlJpABCOCAUHJ0eDzm1oXAAGSKyHtUx9fGzNSacjaPWq6Ea6gI2Z9EUyVRrXV6gC+DRtVu0RBgxuYSnRIzm6O06h0ACpIdlfr9jExSQyOkxTP5GjkPFZBv9bKIDYSmbNpH04ABNFD+CV+nR2636kby+BETCddTlyo27w0zr4HycfC6L0lvUjLH7baHY5Jas7BRMI7AE42uYSUXed6pkY6HtMDulnQruCrCg2oA)

#### useImperativeHandle

In React 19, `ref` is a regular prop on function components, so `useImperativeHandle` is called with the `ref` prop directly — no `forwardRef` needed.

```tsx
// Countdown.tsx
import { useImperativeHandle, Ref } from "react";

export type CountdownHandle = {
  start: () => void;
};

type CountdownProps = {
  ref?: Ref<CountdownHandle>;
};

const Countdown = ({ ref }: CountdownProps) => {
  useImperativeHandle(ref, () => ({
    // start() has type inference here
    start() {
      alert("Start");
    },
  }));

  return <div>Countdown</div>;
};
```

```tsx
// The component using the Countdown component
import { useEffect, useRef } from "react";
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

> If you still maintain code that targets React < 19, see the [forwardRef section](./forward-create-ref.md) for the legacy approach using `forwardRef<CountdownHandle, CountdownProps>`.

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
    (aPromise: Promise<any>) => Promise<any>,
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

**Class Properties**: If you need to declare class properties for later use, define them directly within the class `body` without an initial assignment:

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
  ReturnType<(typeof Comp)["getDerivedStateFromProps"]>
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

#### Function components

As of React 19, `defaultProps` is **no longer supported on function components**. Use destructuring defaults directly in the parameter list — TypeScript will infer the prop as optional automatically:

```tsx
type GreetProps = { age?: number };

const Greet = ({ age = 21 }: GreetProps) => {
  // ...
};
```

If you prefer to declare defaults separately (for example, to share them across components), pull them into a constant and spread them when destructuring:

```tsx
type GreetProps = { age?: number };

const defaultProps = { age: 21 } satisfies GreetProps;

const Greet = ({ age = defaultProps.age }: GreetProps) => {
  // ...
};
```

> Setting `Greet.defaultProps = { age: 21 }` will not work on function components in React 19 — the value is ignored at runtime and `FunctionComponent` no longer types it.

#### Class components

Class components still support `static defaultProps`. The recommended approach is to type the props with the defaulted keys as required, and let `LibraryManagedAttributes` (applied automatically by JSX) make them optional at the call site:

```tsx
type GreetProps = {
  age: number;
};

class Greet extends React.Component<GreetProps> {
  static defaultProps = {
    age: 21,
  };

  render() {
    return <div>Hello, I am {this.props.age}</div>;
  }
}

// Type-checks — `age` is optional at the call site thanks to defaultProps.
const el = <Greet />;
```

<details>
<summary><b><code>React.JSX.LibraryManagedAttributes</code> nuance for library authors</b></summary>

If you export `GreetProps` for consumers, `age` will appear required even though `defaultProps` makes it optional at the call site. `GreetProps` is the _internal_ contract — there's a separate _external_ contract that JSX computes via `React.JSX.LibraryManagedAttributes`. You can compute it explicitly:

```tsx
// internal contract — don't export
type GreetProps = {
  age: number;
};

class Greet extends React.Component<GreetProps> {
  static defaultProps = { age: 21 };
}

// external contract
export type ApparentGreetProps = React.JSX.LibraryManagedAttributes<
  typeof Greet,
  GreetProps
>;
```

For most apps this isn't needed — only library authors who re-export the props type tend to hit it.

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

`object` is a common source of misunderstanding in TypeScript. It does not mean "any object" but rather "any non-primitive type", which means it represents anything that is not `number`, `bigint`, `string`, `boolean`, `symbol`, `null` or `undefined`.

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
  ReturnType<(typeof Comp)["getDerivedStateFromProps"]>
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
  this.setState({ text: e.currentTarget.value });
};
```

<details>

<summary><b>Why two ways to do the same thing?</b></summary>

The first method uses an inferred method signature `(e: React.FormEvent<HTMLInputElement>): void` and the second method enforces a type of the delegate provided by `@types/react`. So `React.ChangeEventHandler<>` is simply a "blessed" typing by `@types/react`, whereas you can think of the inferred method as more... _artisanally hand-rolled_. Either way it's a good pattern to know. [See our Github PR for more](https://github.com/typescript-cheatsheets/react/pull/24).

</details>

> Starting with React v19.2.10 `FormEvent` and `FormEventHandler` are deprecated and should be replaced with `SubmitEvent` and `SubmitEventHandler`. The older event types will still work but trigger a deprecation message.

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
| InputEvent       | Event that occurs before the value of `<input>`, `<select>` and `<textarea>` changes.                                                                                                                                                                                  |
| MouseEvent       | Events that occur due to the user interacting with a pointing device (e.g. mouse)                                                                                                                                                                                      |
| PointerEvent     | Events that occur due to user interaction with a variety pointing of devices such as mouse, pen/stylus, a touchscreen and which also supports multi-touch. Unless you develop for older browsers (IE10 or Safari 12), pointer events are recommended. Extends UIEvent. |
| TouchEvent       | Events that occur due to the user interacting with a touch device. Extends UIEvent.                                                                                                                                                                                    |
| TransitionEvent  | CSS Transition. Not fully browser supported. Extends UIEvent                                                                                                                                                                                                           |
| UIEvent          | Base Event for Mouse, Touch and Pointer events.                                                                                                                                                                                                                        |
| WheelEvent       | Scrolling on a mouse wheel or similar input device. (Note: `wheel` event should not be confused with the `scroll` event)                                                                                                                                               |
| SyntheticEvent   | The base event for all above events. Should be used when unsure about event type                                                                                                                                                                                       |

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

Wrap the components that need the context by rendering the context itself as a provider. In React 19, the context object can be rendered directly — you no longer need `<ThemeContext.Provider>`:

```tsx
import { useState } from "react";

const App = () => {
  const [theme, setTheme] = useState<ThemeContextType>("light");

  return (
    <ThemeContext value={theme}>
      <MyComponent />
    </ThemeContext>
  );
};
```

> `<ThemeContext.Provider value={theme}>` still works and is identical in behavior — it's just the legacy spelling.

Read the context with `use`:

```tsx
import { use } from "react";

const MyComponent = () => {
  const theme = use(ThemeContext);

  return <p>The current theme is {theme}.</p>;
};
```

> `useContext(ThemeContext)` still works too. The main difference is that `use` can also unwrap a promise, and it can be called inside conditions and loops.

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
    <CurrentUserContext value={currentUser}>
      <MyComponent />
    </CurrentUserContext>
  );
};
```

Now that the type of the context can be `null`, you'll notice that you'll get a `'currentUser' is possibly 'null'` TypeScript error if you try to access the `username` property. You can use optional chaining to access `username`:

```tsx
import { use } from "react";

const MyComponent = () => {
  const currentUser = use(CurrentUserContext);

  return <p>Name: {currentUser?.username}.</p>;
};
```

However, it would be preferable to not have to check for `null`, since we know that the context won't be `null`. One way to do that is to provide a custom hook to use the context, where an error is thrown if the context is not provided:

```tsx
import { createContext, use } from "react";

interface CurrentUserContextType {
  username: string;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

const useCurrentUser = () => {
  const currentUserContext = use(CurrentUserContext);

  if (!currentUserContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext>"
    );
  }

  return currentUserContext;
};
```

Using a runtime type check in this will have the benefit of printing a clear error message in the console when a provider is not wrapping the components properly. Now it's possible to access `currentUser.username` without checking for `null`:

```tsx
const MyComponent = () => {
  const currentUser = useCurrentUser();

  return <p>Username: {currentUser.username}.</p>;
};
```

##### Type assertion as an alternative

Another way to avoid having to check for `null` is to use type assertion to tell TypeScript you know the context is not `null`:

```tsx
import { use } from "react";

const MyComponent = () => {
  const currentUser = use(CurrentUserContext);

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

For `useRef`, check the [Hooks section](/docs/basic/getting-started/hooks#useref).

#### Ref as a Prop (Recommended for React 19+)

In React 19+, you can access `ref` directly as a prop in function components - no `forwardRef` wrapper needed.

##### Option 1: Inherit all props from a native element

Use `ComponentPropsWithRef` to inherit all props from a native element.

```tsx
import { ComponentPropsWithRef, useRef } from "react";

function MyInput(props: ComponentPropsWithRef<"input">) {
  return <input {...props} />;
}

// Usage in parent component
function Parent() {
  const inputRef = useRef<HTMLInputElement>(null);

  return <MyInput ref={inputRef} placeholder="Type here..." />;
}
```

##### Option 2: Explicit typing

If you have custom props and want fine-grained control, you can explicitly type the ref:

```tsx
import { Ref, useRef } from "react";

interface MyInputProps {
  placeholder: string;
  ref: Ref<HTMLInputElement>;
}

function MyInput(props: MyInputProps) {
  return <input {...props} />;
}

// Usage in parent component
function Parent() {
  const inputRef = useRef<HTMLInputElement>(null);

  return <MyInput ref={inputRef} placeholder="Type here..." />;
}
```

**Read more**: [Wrapping/Mirroring a HTML Element](/docs/advanced/patterns_by_usecase#wrappingmirroring-a-html-element)

#### Legacy Approaches (Pre-React 19)

##### forwardRef

For React 18 and earlier, use `forwardRef`:

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
    ref: Ref<HTMLButtonElement> // <-- explicit immutable ref type
  ) => (
    <button ref={ref} className="MyClassName" type={props.type}>
      {props.children}
    </button>
  )
);
```

</details>

If you need to grab props from a component that forwards refs, use [`ComponentPropsWithRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L770).

##### createRef

`createRef` is mostly used for class components. Function components typically rely on `useRef` instead.

```tsx
import { createRef, PureComponent } from "react";

class CssThemeProvider extends PureComponent<Props> {
  private rootRef = createRef<HTMLDivElement>();

  render() {
    return <div ref={this.rootRef}>{this.props.children}</div>;
  }
}
```

#### Generic Components with Refs

Generic components typically require manual ref handling since their generic nature prevents automatic type inference. Here are the main approaches:

Read more context in [this article](https://fettblog.eu/typescript-react-generic-forward-refs/).

##### Option 1: Wrapper Component

The most straightforward approach is to manually handle refs through props:

```tsx
interface ClickableListProps<T> {
  items: T[];
  onSelect: (item: T) => void;
  mRef?: React.Ref<HTMLUListElement> | null;
}

export function ClickableList<T>(props: ClickableListProps<T>) {
  return (
    <ul ref={props.mRef}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button onClick={() => props.onSelect(item)}>Select</button>
          {item}
        </li>
      ))}
    </ul>
  );
}
```

##### Option 2: Redeclare forwardRef

For true `forwardRef` behavior with generics, extend the module declaration:

```tsx
// Redeclare forwardRef to support generics
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

// Now you can use forwardRef with generics normally
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
          <button onClick={() => props.onSelect(item)}>Select</button>
          {item}
        </li>
      ))}
    </ul>
  );
}

export const ClickableList = forwardRef(ClickableListInner);
```

##### Option 3: Call Signature

If you need both generic support and proper forwardRef behavior with full type inference, you can use the call signature:

```tsx
// Add to your type definitions (e.g. in `index.d.ts` file)
interface ForwardRefWithGenerics extends React.FC<WithForwardRefProps<Option>> {
  <T extends Option>(
    props: WithForwardRefProps<T>
  ): ReturnType<React.FC<WithForwardRefProps<T>>>;
}

export const ClickableListWithForwardRef: ForwardRefWithGenerics =
  forwardRef(ClickableList);
```

Credits: [https://stackoverflow.com/a/73795494](https://stackoverflow.com/a/73795494)

:::note
Option 1 is usually sufficient and clearer. Use Option 2 when you specifically need `forwardRef` behavior. Use Option 3 for advanced library scenarios requiring both generics and full forwardRef type inference.
:::

#### Additional Resources

- [React refs with TypeScript](https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315)
- [Conditional rendering with forwardRef](https://github.com/typescript-cheatsheets/react/issues/167)

---

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new)

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
              style={{ background: "papayawhip" }}
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

#### Concurrent React

<<<<<<< HEAD
The Concurrent React APIs (`Suspense`, `useTransition`, `useDeferredValue`, `startTransition`, `use`) let you keep the UI responsive while React renders work in the background or waits for data. They're all stable as of React 18 and gained additional capabilities in React 19.

#### `Suspense`

`Suspense` lets you declaratively show a fallback while a child component is waiting for something — typically data unwrapped with `use(promise)`, a lazy component, or a streamed boundary on the server.

```tsx
import { Suspense } from "react";

const UserProfile = ({ userPromise }: { userPromise: Promise<User> }) => {
  const user = use(userPromise);
  return <p>Hello, {user.name}!</p>;
};

const App = ({ userPromise }: { userPromise: Promise<User> }) => (
  <Suspense fallback={<p>Loading...</p>}>
    <UserProfile userPromise={userPromise} />
  </Suspense>
);
```

`SuspenseProps` is typed as `{ children?: ReactNode; fallback?: ReactNode }`. The fallback can be any `ReactNode`, including `null`.

#### `use`

`use` reads the value of a context or a promise. Unlike `useContext`, it can be called inside conditions and loops, and it integrates with `Suspense` for promises.

```tsx
import { use } from "react";

const Comments = ({
  commentsPromise,
}: {
  commentsPromise: Promise<Comment[]>;
}) => {
  // Suspends until the promise resolves; throws to the nearest <Suspense>.
  const comments = use(commentsPromise);
  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>{c.text}</li>
      ))}
    </ul>
  );
};
```

The promise is typically created by a parent and passed down — don't create it inside the component, or you'll create a new promise on every render.

#### `useTransition`

`useTransition` marks a state update as non-urgent so React can keep typing, scrolling, and other urgent input responsive while it renders.

```tsx
import { useState, useTransition } from "react";

const TabSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<"posts" | "comments">("posts");

  const selectTab = (next: "posts" | "comments") => {
    startTransition(() => {
      setTab(next);
    });
  };

  return (
    <>
      <button disabled={isPending} onClick={() => selectTab("posts")}>
        Posts
      </button>
      <button disabled={isPending} onClick={() => selectTab("comments")}>
        Comments
      </button>
      {tab === "posts" ? <Posts /> : <Comments />}
    </>
  );
};
```

##### Async transitions (React 19)

In React 19, the function passed to `startTransition` can be async. This is the foundation for Actions and is how `useActionState` and `<form action>` schedule their pending state.

```tsx
const [isPending, startTransition] = useTransition();

const onSubmit = () => {
  startTransition(async () => {
    await saveDraft(content);
    setSavedAt(new Date());
  });
};
```

`isPending` stays `true` for the entire duration of the async callback, including awaited work.

#### `useDeferredValue`

`useDeferredValue` lets you defer re-rendering a part of the UI that's expensive to compute, so urgent updates (typing into an input) can flush first.

```tsx
import { useDeferredValue, useState } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {/* SearchResults re-renders with deferredQuery, lagging behind input */}
      <SearchResults query={deferredQuery} />
    </>
  );
};
```

##### `initialValue` (React 19)

React 19 added an optional second argument: the value to use during the initial render before the deferred value has caught up. Useful for SSR/streaming when you want to show a known initial value rather than the latest one.

```tsx
const deferredQuery = useDeferredValue(query, "");
```

#### `startTransition` (standalone)

`startTransition` is also exported directly from `react` for use outside components — for example, inside event handlers in non-React code or third-party stores.

```tsx
import { startTransition } from "react";

store.subscribe(() => {
  startTransition(() => {
    forceRender();
  });
});
```

The standalone version does not provide an `isPending` flag — use the hook if you need that.

#### See also

- [`useActionState`, `useFormStatus`, `useOptimistic`](https://react.dev/reference/react) — built on top of transitions
- # [Server Components and `'use server'`](https://react.dev/reference/rsc/server-components)
  _Not written yet._ watch [https://github.com/sw-yx/fresh-async-react](https://github.com/sw-yx/fresh-async-react) for more on React Suspense and Time Slicing.
  > > > > > > > main

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

<!--END-SECTION:concurrent-->

<!--START-SECTION:linting-->

### Linting

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

Another great resource is ["Using ESLint and Prettier in a TypeScript Project"](https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb) by @robertcoopercode.

Wes Bos is also working on [TypeScript support for his eslint+prettier config.](https://github.com/wesbos/eslint-config-wesbos/issues/68)

If you're looking for information on Prettier, check out the [Prettier](https://github.com/typescript-cheatsheets/react/blob/main/docs/advanced/misc-concerns.md#prettier) guide.

<!--END-SECTION:linting-->

## My question isn't answered here!

- [File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).

## Contributors

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. See [CONTRIBUTORS.md](/CONTRIBUTORS.md) for the full list. Contributions of any kind welcome!
