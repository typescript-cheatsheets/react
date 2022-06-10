---
id: function_components
title: Function Components
---

These can be written as normal functions that take a `props` argument and return a JSX element.

```tsx
// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = {
  message: string;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const App = ({ message }: AppProps) => <div>{message}</div>;

// you can choose annotate the return type so an error is raised if you accidentally return some other type
const App = ({ message }: AppProps): JSX.Element => <div>{message}</div>;

// you can also inline the type declaration; eliminates naming the prop types, but looks repetitive
const App = ({ message }: { message: string }) => <div>{message}</div>;
```

> Tip: You might use [Paul Shen's VS Code Extension](https://marketplace.visualstudio.com/items?itemName=paulshen.paul-typescript-toolkit) to automate the type destructure declaration (incl a [keyboard shortcut](https://twitter.com/_paulshen/status/1392915279466745857?s=20)).

<details>

<summary><b>Why is <code>React.FC</code> discouraged? What about <code>React.FunctionComponent</code>/<code>React.VoidFunctionComponent</code>?</b></summary>

You may see this in many React+TypeScript codebases:

```tsx
const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
  <div>{message}</div>
);
```

However, the general consensus today is that `React.FunctionComponent` (or the shorthand `React.FC`) is [discouraged](https://github.com/facebook/create-react-app/pull/8177). This is a nuanced opinion of course, but if you agree and want to remove `React.FC` from your codebase, you can use [this jscodeshift codemod](https://github.com/gndelia/codemod-replace-react-fc-typescript).

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

**Array.fill**

```tsx
const MyArrayComponent = () => Array(5).fill(<div />);
const el2 = <MyArrayComponent />; // throws an error
```

Unfortunately just annotating the function type will not help so if you really need to return other exotic types that React supports, you'd need to perform a type assertion:

```tsx
const MyArrayComponent = () => Array(5).fill(<div />) as any as JSX.Element;
```

[See commentary by @ferdaber here](https://github.com/typescript-cheatsheets/react/issues/57).

</details>
