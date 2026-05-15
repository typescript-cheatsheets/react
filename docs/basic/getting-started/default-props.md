---
id: default_props
title: Typing default props
---

## Function components

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

## Class components

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
