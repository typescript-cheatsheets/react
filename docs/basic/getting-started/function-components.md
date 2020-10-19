---
id: function_components
title: Function Components
---

These can be written as normal functions that take a `props` argument and return a JSX element.

```tsx
type AppProps = { message: string }; /* could also use interface */
const App = ({ message }: AppProps) => <div>{message}</div>;
```

<details>

<summary><b>What about `React.FC`/`React.FunctionComponent`/`React.VoidFunctionComponent`?</b></summary>

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

- It provides an implicit definition of `children` (see below) - however there are some issues with the implicit `children` type (e.g. [DefinitelyTyped#33006](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33006)), and it might be better to be explicit about components that consume `children`, anyway.

```tsx
const Title: React.FunctionComponent<{ title: string }> = ({
  children,
  title,
}) => <div title={title}>{children}</div>;
```

<details>
<summary>

As of [@types/react 16.9.48](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/46643), you can also use `React.VoidFunctionComponent` or `React.VFC` type if you want to type `children` explicitly. This is an interim solution until `FunctionComponent` will accept no children by default (planned for `@types/react@^18.0.0`).

</summary>

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
