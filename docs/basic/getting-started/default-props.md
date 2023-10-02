---
id: default_props
title: Typing defaultProps
---

## You May Not Need `defaultProps`

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

## Typing `defaultProps`

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

## Consuming Props of a Component with defaultProps

A component with `defaultProps` may seem to have some required props that actually aren't.

### Problem Statement

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

### Solution

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

## Misc Discussions and Knowledge

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
