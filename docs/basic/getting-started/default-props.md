---
id: default_props
title: Typing defaultProps
---

## Typing defaultProps

For TypeScript 3.0+, type inference [should work](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html), although [some edge cases are still problematic](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/61). Just type your props like normal, except don't use `React.FC`.

```tsx
// ////////////////
// function components
// ////////////////
type GreetProps = { age: number } & typeof defaultProps;
const defaultProps = {
  age: 21,
};

const Greet = (props: GreetProps) => {
  /*...*/
};
Greet.defaultProps = defaultProps;
```

For **Class components**, there are [a couple ways to do it](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/pull/103#issuecomment-481061483)(including using the `Pick` utility type) but the recommendation is to "reverse" the props definition:

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
  <summary>An alternative approach</summary>

As per [this tweet](https://twitter.com/dan_abramov/status/1133878326358171650), defaultProps will eventually be deprecated. You can check the discussions here:

- https://twitter.com/hswolff/status/1133759319571345408

The consensus is to use object default values.

```tsx
// ////////////////
// function components
// ////////////////
type GreetProps = { age: number };

const Greet = ({ age = 21 }: GreetProps) => {
  /*...*/
};
```

```tsx
// ////////////////
// class components
// ////////////////
type GreetProps =  {
  age?: number;
};

class Greet extends React.Component<GreetProps> {
  const { age = 21 } = this.props
  /*...*/
}

let el = <Greet age={3} />;
```

</details>

<details>
  <summary>Why does React.FC break defaultProps?</summary>

You can check the discussions here:

- https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680
- https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30695
- https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/87

This is just the current state and may be fixed in future.

</details>

<details>
 <summary>TypeScript 2.9 and earlier</summary>

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

The problem with this approach is it causes complex issues with the type inference working with `JSX.LibraryManagedAttributes`. Basically it causes the compiler to think that when creating a JSX expression with that component, that all of its props are optional.

[See commentary by @ferdaber here](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/57) and [here](https://github.com/typescript-cheatsheets/react/issues/61).

</details>

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/new).
