---
id: hooks
title: Hooks
---

Hooks are [supported in `@types/react` from v16.8 up](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L800-L1031).

## useState

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

## useReducer

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

## useEffect / useLayoutEffect

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

## useRef

In TypeScript, `useRef` returns a reference that is either [read-only](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/abd69803c1b710db58d511f4544ec1b70bc9077c/types/react/v16/index.d.ts#L1025-L1039) or [mutable](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/abd69803c1b710db58d511f4544ec1b70bc9077c/types/react/v16/index.d.ts#L1012-L1023), depends on whether your type argument fully covers the initial value or not. Choose one that suits your use case.

### Option 1: DOM element ref

**[To access a DOM element](https://reactjs.org/docs/refs-and-the-dom.html):** provide only the element type as argument, and use `null` as initial value. In this case, the returned reference will have a read-only `.current` that is managed by React. TypeScript expects you to give this ref to an element's `ref` prop:

```tsx
function Foo() {
  // - If possible, prefer as specific as possible. For example, HTMLDivElement
  //   is better than HTMLElement and way better than Element.
  // - Technical-wise, this returns RefObject<HTMLDivElement>
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Note that ref.current may be null. This is expected, because you may
    // conditionally render the ref-ed element, or you may forgot to assign it
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

### Option 2: Mutable value ref

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

### See also

- [Related issue by @rajivpunjabi](https://github.com/typescript-cheatsheets/react/issues/388) - [Playground](https://www.typescriptlang.org/play#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcARFDvmQNwCwAUI7hAHarwCCYYcAvHAAUASn4A+OAG9GjOHAD0CBLLnKGcxHABiwKBzgQwMYGxS4WUACbBWAczgwIcSxFwBXEFlYxkxtgDoVTQBJVmBjZAAbOAA3KLcsOAB3YEjogCNE1jc0-zgAGQBPG3tHOAAVQrAsAGVcKGAjOHTCuDdUErhWNgBabLSUVFQsWBNWA2qoX2hA9VU4AGFKXyx0AFk3H3TIxOwCOAB5dIArLHwgpHcoSm84MGJJmFbgdG74ZcsDVkjC2Y01f7yFQsdjvLAEACM-EwVBg-naWD2AB4ABLlNb5GpgZCsACiO083jEgn6kQAhMJ6HMQfpKJCFpE2IkBNg8HCEci0RisTj8VhCTBiaSKVSVIoAaoLnBQuFgFFYvFEikBpkujkMps4FgAB7VfCdLmY7F4gleOFwAByEHg7U63VYfXVg2Go1MhhG0ygf3mAHVUtF6jgYLtwUdTvguta4Bstjs9mGznCpVcbvB7u7YM90B8vj9vYgLkDqWxaeCAEzQ1n4eHDTnoo2801EknqykyObii5SmpnNifA5GMZmCzWOwOJwudwC3xjKUyiLROKRBLJf3NLJO9KanV64xj0koVifQ08k38s1Sv0DJZBxIx5DbRGhk6J5Nua5mu4PEZPOAvSNgsgnxsHmXZzIgRZyDSYIEAAzJWsI1k+BCovWp58gKcAAD5qmkQqtqKHbyCexoYRecw7IQugcAs76ptCdIQv4KZmoRcjyMRaGkU28A4aSKiUXAwwgpYtEfrcAh0mWzF0ax7bsZx3Lceetx8eqAlYPAMAABa6KJskSXAdKwTJ4kwGxCjyKy-bfK05SrDA8mWVagHAbZeScOY0CjqUE6uOgqDaRAOSfKqOYgb8KiMaZ9GSeCEIMkyMVyUwRHWYc7nSvAgUQEk6AjMQXpReWyWGdFLHeBZHEuTCQEZT8xVwaV8BxZCzUWZQMDvuMghBHASJVnCWhTLYApiH1chIqgxpGeCfCSIxAC+Yj3o+8YvvgSLyNNOLjeBGhTTNdLzVJy3reGMBbTtrB7RoB3XbNBAneCsHLatcbPhdV3GrdB1WYhw3IKNZq-W2DCLYRO7QPAljgsgORcDwVJAA)
- [Example from Stefan Baumgartner](https://fettblog.eu/typescript-react/hooks/#useref) - [Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgIilQ3wFgAoCzAVwDsNgJa4AVJADxgElaxqYA6sBgALAGIQ01AM4AhfjCYAKAJRwA3hThwA9DrjBaw4CgA2waUjgB3YSLi1qp0wBo4AI35wYSZ6wCeYEgAymhQwGDw1lYoRHCmEBAA1oYA5nCY0HAozAASLACyADI8fDAAoqZIIEi0MFpwaEzS8IZllXAAvIjEMAB0MkjImAA8+cWl-JXVtTAAfEqOzioA3A1NtC1wTPIwirQAwuZoSV1wql1zGg3aenAt4RgOTqaNIkgn0g5ISAAmcDJvBA3h9TsBMAZeFNXjl-lIoEQ6nAOBZ+jddPpPPAmGgrPDEfAUS1pG5hAYvhAITBAlZxiUoRUqjU6m5RIDhOi7iIUF9RFYaqIIP9MlJpABCOCAUHJ0eDzm1oXAAGSKyHtUx9fGzNSacjaPWq6Ea6gI2Z9EUyVRrXV6gC+DRtVu0RBgxuYSnRIzm6O06h0ACpIdlfr9jExSQyOkxTP5GjkPFZBv9bKIDYSmbNpH04ABNFD+CV+nR2636kby+BETCddTlyo27w0zr4HycfC6L0lvUjLH7baHY5Jas7BRMI7AE42uYSUXed6pkY6HtMDulnQruCrCg2oA)

## useImperativeHandle

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

### See also:

- [Using ForwardRefRenderFunction](https://stackoverflow.com/a/62258685/5415299)

## Custom Hooks

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

## More Hooks + TypeScript reading:

- https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d
- https://fettblog.eu/typescript-react/hooks/#useref

If you are writing a React Hooks library, don't forget that you should also expose your types for users to use.

## Example React Hooks + TypeScript Libraries:

- https://github.com/mweststrate/use-st8
- https://github.com/palmerhq/the-platform
- https://github.com/sw-yx/hooks

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).
